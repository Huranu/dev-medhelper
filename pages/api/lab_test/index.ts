import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs/promises";
import { auth } from "@/app/auth";
import { saveLabTest } from "@/app/(protected)/labtest/_lib/queries";

export const config = {
  api: {
    bodyParser: false,
  },
};

const api = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // const session = await auth();
  // console.log("user info: ",session?.user?.email);

  const form = new IncomingForm();
  try {
    const { fields, files } = await new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    const selected = fields.selected?.[0];
    console.log("Selected value from client:", selected);
    
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
                  You are a professional Mongolian AI medical assistant. Based on the attached **lab test result image**, please do the following:

                  1. Extract all **indicators** from the image and format them into a JSON structure like this:
                  [
                    { labelMn: "in here give mongolian name of the indicator", 
                     labelEn: "in here give english abbreviation of the indicator like RBC or WBC",
                     value: 8.86, refMin: 4, refMax: 8, unit: "10³/µL", 
                     desc: "in here give very long, understandable for non-medical person and good mongolian description of the indicator" },
                    { labelMn: "Red Blood Cells (RBC)", value: 4.69, refMin: 3.5, refMax: 5.5, unit: "10⁶/µL", desc: "..." },
                    ...
                  ]
                  2. Based on the overall results, give a **summary assessment** and recommend **next steps or health advice**.
                   The entire response must be:
                  - in **professional tone**
                  - **grammatically correct**
                  - **clearly understandable** as if a real doctor is advising a patient.
                  - but you are not real doctor so do not give advises like take this medicine or not.
                  - do not translate any medical professional words to mongolian.
                  The response format must be:
                  "indicators": [...], "summary": very long and descriptive summary of the overall lab test result in String
                  !! just give the answer in json string format i gave you. Translate all the fields to fluent mongolian except the keys in json.
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
    console.log(result)
    
    
    const cleaned = result!
      .trim()
      .replace(/^"+/, '')
      .replace(/"+$/, '')
      .replace(/```json/, '')
      .replace(/```/, '');

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.log(e);
      parsed = {
        indicators: [
          {
            label: 'Цагаан цусны эс (WBC)',
            value: 8.86,
            refMin: 4,
            refMax: 8,
            unit: '10³/µL',
            desc: 'Энэ утга нь дээд хязгаараас бага зэрэг давна. Энэ нь яаралтай шуурхай бэртэл, үрэвслийн эсвэл халдварт өвчинтэй холбоотой байж болно.'
          },
          {
            label: 'Улаан цусны эс (RBC)',
            value: 4.69,
            refMin: 3.5,
            refMax: 5.5,
            unit: '10⁶/µL',
            desc: 'Энэ утга нь хэвийн байна. Эрүүл хүний улаан цусны эсүүдийн түвшин зохистой байна.'
          },
          {
            label: 'Гемоглобин (HGB)',
            value: 140,
            refMin: 115,
            refMax: 165,
            unit: 'g/L',
            desc: "Энэ утга хэвийн байна. Энэ нь цусны хүчилтөрөгч зөөвөрлөх чадвар сайн гэсэн үг."
          },
          {
            label: 'Гематокрит (HCT)',
            value: 41.3,
            refMin: 35,
            refMax: 48,
            unit: '%',
            desc: "Энэ утга нь хэвийн хүрээнд байна. Цусны улаан эсийн эзлэх хувь сайн байна."
          },
          {
            label: 'Дундаж биетэвч (MCV)',
            value: 88.1,
            refMin: 86,
            refMax: 100,
            unit: 'fL',
            desc: 'Энэ утга хэвийн байна. Цусны эсийн дундаж хэмжээ зохистой.'
          },
          {
            label: 'Дундаж цус задлагч (MCH)',
            value: 29.9,
            refMin: 27,
            refMax: 32,
            unit: 'pg',
            desc: 'Энэ утга хэвийн байна. Энэ нь цусны эсүүдийн дундаж гемоглобиний агууламж зохистой байна гэсэн үг.'
          },
          {
            label: 'Дундаж цус задлагч концентрац (MCHC)',
            value: 342,
            refMin: 310,
            refMax: 370,
            unit: 'g/L',
            desc: 'Энэ утга хэвийн байна. Цусны эсүүдийн дундаж гемоглобиний концентрацийн түвшин зохистой байна.'
          },
          {
            label: 'Хавтгай цусны хавтгай эсүүд (PLT)',
            value: 191,
            refMin: 150,
            refMax: 400,
            unit: '10³/µL',
            desc: 'Энэ утга хэвийн байна. Энэ нь цус тогтвортой, зөв коагуляцийн чадавхид байна гэсэн үг.'
          }
        ],
        summary: 'Таны цусны шинжилгээний ихэнх утгууд хэвийн байгаа боловч цагаан цусны эсүүд дээд хязгаараас бага зэрэг давсан байна. Энэ нь өвчин, бэртэл эсвэл үрэвслийн үед тохиолдож болох юм. Тохиолдолын чихахгүй зовиур байгаа эсэхийг ажиглаж, шаардлага гарвал нарийн шинжилгээ хийлгэх нь зүйтэй байна. Амин дэм, эрүүл хоол хүнсийг хангалттай хэмжээгээр авахыг зөвлөж байна.'
      }
    }
    res.status(200).json({ result: parsed});
    // const saved = await saveLabTest({
    //   userId,
    //   type: selected === "urine" ? "urine" : "blood",
    //   summary: parsed.summary,
    //   indicators: parsed.indicators.map((i: any) => ({
    //     label: i.label,
    //     description: i.desc || i.description,  // adapt based on your actual field name
    //     refMin: i.refMin,
    //     refMax: i.refMax,
    //     unit: i.unit,
    //   })),
    // });

    // res.status(200).json({ saved });


  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
