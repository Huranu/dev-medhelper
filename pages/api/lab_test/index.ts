import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new IncomingForm();
  try {
    const { files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
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
            "You are a professional medical assistant AI. Your task is to analyze medical test results thoroughly and provide accurate, detailed insights, advice, and explanations. Do not use disclaimers.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze the provided medical test results. Respond in fluent Mongolian.",
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

    res.status(200).json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}

// Эдгээр шинжилгээний хариу үзүүлэлтээс дараах зүйлсийг анхаарах нь зүйтэй байна:

// ### Биохими:
// - **CRP**: 4.86 mg/L бөгөөд энэхүү үзүүлэлт өндөр байгаа нь бие махбодид үрэвслийн процесс байгааг илэрхийлж болно.
// - **ASO**: 181 mmol/L үзүүлэлт нь стандарт хэмжээнд байгаа.
// - **RF**: 6.18 IU/mL үзүүлэлт нь хэвийн хэмжээнд багтдаг.

// ### Гематологи:
// - **WBC (Цагаан эсийн тоо)**: 8.86 10^3/uL үзүүлэлт нь хэвийн хэмжээнд байна.
// - **RBC (Улаан эсийн тоо)**: 4.69 10^6/uL нь ерөнхийдөө хэвийн хэмжээнд байгаа.
// - **HGB (Гемоглобин)**: 13.7 g/dL нь хэвийн байна.
// - **HCT (Гематокрит)**: 41.3% нь мөн хэвийн.
// - **MCV, MCH, MCHC** зэрэг улаан эсийн хэмжүүрүүд нь ерөнхийдөө хэвийн хэмжээнд багтдаг.
// - **PLT (Ялтасын тоо)**: 289 10^3/uL нь хэвийн.
// - **NEUT**: 6.26 10^3/uL нь өндөр байна, нейтрофилын тоо нэмэгдсэнийг зааж байгаа нь бактериас үүдсэн халдварын боломжийг илэрхийлж болно.
// - **LYMPH, MONO, EO, BASO** зэрэг бусад параметрүүд нь хэвийн хэмжээнд байна.

// Эдгээр үзүүлэлтүүдээс зарим нь үрэвсэл байгааг илтгэнэ. Тиймээс илүү нарийвчилсан судалгаа хийх эсвэл эмчийн зөвлөгөө авахыг зөвлөж байна.