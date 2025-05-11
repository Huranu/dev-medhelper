import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = new OpenAI({ apiKey: "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" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new IncomingForm();
  try {
    const { files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = files.file?.[0];
    if (!file || !file.mimetype?.startsWith("image/")) {
      return res.status(400).json({ error: "Please upload a valid image file" });
    }

    const fileBuffer = await fs.readFile(file.filepath);
    const base64Image = `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`;

    const response = await api.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "assistant",
          content:
            "You are a professional medical assistant AI. Your task is to analyze medical test results thoroughly and provide accurate, detailed insights, advice, and explanations.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
                  You are a professional AI medical assistant. Based on the attached **blood lab test result image**, please do the following:
                  

                  1. Extract all measurable **blood test indicators** from the image and format them into a JSON structure like this:
                  [
                    { label: "White Blood Cells (WBC)", value: 8.86, refMin: 4, refMax: 8, unit: "10³/µL" },
                    { label: "Red Blood Cells (RBC)", value: 4.69, refMin: 3.5, refMax: 5.5, unit: "10⁶/µL" },
                    ...
                  ]
                  2. Then, provide a **detailed explanation for each indicator**, specifying whether the value is within the normal range or abnormal. If abnormal, give **warnings, potential health risks, and basic recommendations**.
                  3. Finally, based on the overall results, give a **summary assessment** and recommend **next steps or health advice**.
                   The entire response must be:
                  - in **professional tone**
                  - **grammatically correct**
                  - **clearly understandable** as if a real doctor is advising a patient.
                  The response format must be:
                  - "indicators": JSON array (label, value, unit, and normal range)
                  - "details": Explanation and recommendations for each value
                  - "summary": General health conclusion based on all values
                  !! just give the answer in json string format i gave you. do not use any disclaimer. and translate all the fields to fluent mongolian except the keys in json. don't be lazy !!
                  `,
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
    });
    const result = response.choices[0].message.content;
    const cleaned = result!
      .trim()
      .replace(/^"+/, '')
      .replace(/"+$/, '')
      .replace(/```json/, '')
      .replace(/```/, '');

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      console.log(parsed);
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
    res.status(200).json({ result: parsed});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
