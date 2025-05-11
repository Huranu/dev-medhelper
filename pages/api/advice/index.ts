import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Fields, Files, IncomingForm } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = new OpenAI({
  apiKey: "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new IncomingForm();
  try {
    const [fields]: [Fields, Files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const privateInfoRaw = fields.privateInfo?.[0];
    const symptomsRaw = fields.symptoms?.[0];
    const labResultsRaw = fields.labResults?.[0];

    if (!privateInfoRaw || !symptomsRaw) {
      return res.status(400).json({ error: "Missing privateInfo or symptoms" });
    }

    let parsedPrivateInfo, parsedLabResults;
    try {
      parsedPrivateInfo = JSON.parse(privateInfoRaw);
      parsedLabResults = labResultsRaw ? JSON.parse(labResultsRaw) : null;
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON in FormData fields" });
    }

    const { privacyInfo, lifeStyle } = parsedPrivateInfo;
    const symptoms = symptomsRaw;

    const prompt = `
You are a medical assistant AI that provides concise health summaries, potential causes, and advice based on user information.

Here is the user's data:

Privacy Info:
- Name: ${privacyInfo.name || "N/A"}
- Gender: ${privacyInfo.gender || "N/A"}
- Birthday: ${privacyInfo.birthday || "N/A"}
- Height: ${privacyInfo.height || "N/A"} cm
- Weight: ${privacyInfo.weight || "N/A"} kg

Lifestyle:
- Smoking: ${lifeStyle.smoking || 0} (scale of 0 to 5)
- Pregnant: ${lifeStyle.pregnant || "N/A"}
- Underlying diseases: ${lifeStyle.underlyingDiseases?.length > 0 ? lifeStyle.underlyingDiseases.join(", ") : "None"}
- Exercise per week: ${lifeStyle.exercisePerWeek || 0} times

Symptoms:
${symptoms}

Lab Results:
${parsedLabResults ? JSON.stringify(parsedLabResults, null, 2) : "None provided"}

Please return a JSON object with the following format:

{
  "summary": "Short explanation of what the user data and symptoms suggest",
  "causes": [
    {
      "name": "[Likely medical condition]",
      "advice": "[Brief advice]",
      "info": "[Statistical or informative note]"
    }
  ]
}

Be accurate, clear, and concise. No matter what give full data in summmary and causes. And always give 3 causes, no more no less.
 And also in the causes just give 3 common medical condition. Translate to fluent Mongolian but do not translate the keys like summary and causes
`;

    const response = await api.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "assistant",
          content: "You are a professional medical assistant AI.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response.choices[0].message.content;
    const cleaned = result!
      .trim()
      .replace(/^"+/, "")
      .replace(/"+$/, "")
      .replace(/```json/, "")
      .replace(/```/, "");
    console.log(result)
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      console.log("Parsed OpenAI response:", parsed);
    } catch (e) {
      console.error("Invalid JSON from OpenAI:", e);
      return res.status(500).json({ error: "Failed to parse OpenAI response" });
    }

    res.status(200).json({ result: parsed });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}