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

// Таны өгөгдсөн шинжилгээний хариуг харгалзан үзвэл:

// **Биохимийн шинжилгээнээс:**
// - **CRP (С-реактив уураг):** 4.86 мг/л. Энэ нь хэвийн хэмжээнээс (0-5 мг/л) дээд талдаа ойртсон байна. Энэ үзүүлэлт нь бие дэх үрэвслийн түвшинг илтгэх бөгөөд бага зэргийн үрэвсэл байгааг харуулж байна.
// - **ASO (Антистрептолизин O уураг):** 181 нэгж. Энэ нь хэвийн хэмжээнд (0-200) байна. 
// - **RF (Ревматоид хүчин зүйл):** 6.18 IU/mL. Хэвийн хэмжээнд (0-15 IU/mL) байна.

// **Гематологи-цусны шингэний тоо:**
// - **WBC (Цагаан эсийн тоо):** 8.86 x10^3/μL. Энэ нь хэвийн цар хүрээнд (4-8 x10^3/μL) ойр боловч хэтэрхий их биш байна.
// - **RBC (Улаан эсийн тоо):** 4.69 x10^6/μL. Хэвийн хэмжээнд (3.5-5 x10^6/μL) байна.
// - **HGB (Гемоглобин):** 13.7 g/dL. Энэ нь хэвийн хэмжээнд (12-16 g/dL) байна.
// - **HCT (Гематокрит):** 41.3%. Хэвийн хэмжээнээс арай доогуур байна (35-50%).
// - **MCV, MCH, MCHC:** Эдгээр нь улаан эсийн хэмжээ ба өнгөний концентрацийг харуулдаг бөгөөд бүгд хэвийн хэмжээн дотор байна.
// - **PLT (Ялтас эсийн тоо):** 289 x10^3/μL. Хэвийн хэмжээнд (180-320 x10^3/μL) байна.

// Бусад үзүүлэлтүүд (RDW, PDW, MPV гэх мэт) ч мөн хэвийн хэмжээнд байна. 

// Таны биохими болон гематологийн үр дүнгүүд ихэнхдээ хэвийн хэмжээнд байгаа ба бага зэргийн үрэвслийн шинж тэмдэг илэрч буйг харуулж байна. Нарийвчилсан зөвлөгөөг мэргэжлийн эмчээс авах нь зүйтэй.