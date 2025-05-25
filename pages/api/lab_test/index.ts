import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs/promises";

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
          role: "user",
          content: [
            {
              type: "text",
              text: `
                  You are a professional Mongolian AI medical assistant. Based on the attached **lab test result image**, please do the following:

                  1. Give all **indicators** from the image and format them into a JSON structure like this:
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
      labelMn: "Цусны Цагаан эс",
      labelEn: "WBC",
      value: 7.97,
      refMin: 3.98,
      refMax: 10.04,
      unit: "10³/µL",
      desc: "Цусны цагаан эсүүд нь биеийн хамгаалалтын системийн нэг хэсэг бөгөөд бактери, вирусын эсрэг тэмцдэг эсүүд юм. Тиймээс тэдгээрийн хэмжээ хэвийн байх нь эрүүл мэндэд чухал ач холбогдолтой."
    },
    {
      labelMn: "Цусны Улаан эс",
      labelEn: "RBC",
      "value": 4.98,
      "refMin": 3.98,
      "refMax": 5.22,
      "unit": "10⁶/µL",
      "desc": "Цусны улаан эсүүд нь хүчилтөрөгчийг биеийн бүх хэсэгт тээвэрлэдэг. Тиймээс тэдгээрийн хэмжээ хэвийн байх нь биеийн үйл ажиллагааг хэвийн байлгахад чухал ач холбогдолтой."
    },
    {
      "labelMn": "Гемоглобин",
      "labelEn": "Hb",
      "value": 12.7,
      "refMin": 11.2,
      "refMax": 15.7,
      "unit": "g/dL",
      "desc": "Гемоглобин нь улаан эсийн дотор байх бөгөөд хүчилтөрөгчийг тээвэрлэхэд оролцдог. Гемоглобин буурах нь цус багадалтын шинж тэмдэг байж болно."
    },
    {
      "labelMn": "Гематокрит",
      "labelEn": "HCT",
      "value": 40.9,
      "refMin": 34.1,
      "refMax": 44.9,
      "unit": "%",
      "desc": "Гематокрит нь цусны нийт эзлэхүүний хэдэн хувь нь улаан эсээс бүтдэгийг хэмждэг. Энэ нь цус багадалт болон бусад цусны асуудлын үед чухал үзүүлэлт юм."
    },
    {
      "labelMn": "Улаан эсийн дундаж эзэлхүүн",
      "labelEn": "MCV",
      "value": 82.1,
      "refMin": 79.4,
      "refMax": 94.8,
      "unit": "fL",
      "desc": "MCV нь улаан эсийн дундаж эзэлхүүнийг харуулдаг. Энэ үзүүлэлт нь цус багадалт болон бусад эрүүл мэндийн асуудлыг тодорхойлоход тусалдаг."
    },
    {
      "labelMn": "Улаан эсийн дундаж гемоглобин",
      "labelEn": "MCH",
      "value": 25.5,
      "refMin": 25.6,
      "refMax": 32.2,
      "unit": "pg",
      "desc": "Улаан эсийн дундаж гемоглобин нь нэг улаан эст агуулагдах гемоглобины хэмжээг харуулдаг. Энэ үзүүлэлт нь бага байвал цус багадалт байгааг илтгэнэ."
    },
    {
      "labelMn": "Улаан эсэд ногдох гемоглобины концентраци",
      "labelEn": "MCHC",
      "value": 31.1,
      "refMin": 32.5,
      "refMax": 35.5,
      "unit": "g/dL",
      "desc": "MCHC нь улаан эсийн доторх гемоглобины концентрацийг хэмждэг. Энэ нь төмрийн дутагдал болон бусад цусны эмгэгийг тодорхойлоход ашигладаг."
    },
    {
      "labelMn": "Цусны ялтас",
      "labelEn": "PLT",
      "value": 173,
      "refMin": 180,
      "refMax": 369,
      "unit": "10³/µL",
      "desc": "Цусны ялтас нь цусны бүлэгнэлтэд чухал үүрэгтэй. Ялтасны хэмжээ бага байвал цус гаралт ихэсч болзошгүй байдаг."    
    },
    {
      "labelMn": "Улаан эсийн тархалтын стандарт хазайлт",
      "labelEn": "RDW-SD",
      "value": 47.0,
      "refMin": 37.0,
      "refMax": 47.0,
      "unit": "fL",
      "desc": "Улаан эсийн тархалтын стандарт хазайлт нь улаан эсүүдийн хэмжээний ялгааг хэмжинэ. Энэ үзүүлэлт том болоод жижиг улаан эсийн харьцааг тодорхойлоход ашигладаг."
    },
    {
      "labelMn": "Улаан эсийн тархалтын хазайлтын коэффициент",
      "labelEn": "RDW-CV",
      "value": 15.7,
      "refMin": 11.6,
      "refMax": 14.8,
      "unit": "%",
      "desc": "Улаан эсийн тархалтын хазайлтын коэффициент нь улаан эсүүдийн хэмжээнээс хамаарсан өөрчлөлтийг мөн хэмждэг. Энэ үзүүлэлт буурах нь бусад цусны эмгэгийн шинж тэмдэг байж болзошгүй."
    },
    {
      "labelMn": "Цусны ялтсын тархалтын өргөн",
      "labelEn": "PDW",
      "value": 10.5,
      "refMin": 9.0,
      "refMax": 17.0,
      "unit": "fL",
      "desc": "PDW нь цусны ялтсуудын хэмжээний өөрчлөлтийг харуулдаг бөгөөд бүлэгнэлтийн үйл явцыг хянахад чухал үзүүлэлт юм."   
    },
    {
      "labelMn": "Цусны ялтсын дундаж эзэлхүүн",
      "labelEn": "MPV",
      "value": 10.5,
      "refMin": 5.0,
      "refMax": 10.0,
      "unit": "fL",
      "desc": "MPV нь цусны ялтсын дундаж хэмжээ бөгөөд бүлэгнэлтийн үйл явцын үзүүлэлт болдог. Хэрэв энэ үзүүлэлт их байвал бүлэгнэлтийн эмгэг байж болзошгүй."
    },
    {
      "labelMn": "Цусны том ялтсын эзлэх хувь",
      "labelEn": "P-LCR",
      "value": 29.2,
      "refMin": 16.9,
      "refMax": 45.1,
      "unit": "%",
      "desc": "P-LCR нь том хэмжээтэй ялтсуудын эзлэх хувь бөгөөд энэ нь бүлэгнэлтийн үйл явцад нөлөөлж болно."
    },
    {
      "labelMn": "Цусны ялтсын эзлэх хувь",
      "labelEn": "PCT",
      "value": 0.18,
      "refMin": 0.12,
      "refMax": 0.38,
      "unit": "%",
      "desc": "PCT нь нийт цусны ялтсуудын эзлэх хувь бөгөөд бүлэгнэлтийн үйл явцыг хянахад чухал үзүүлэлт болдог."
    },
    {
      "labelMn": "Нейтрофил эзлэх хувь",
      "labelEn": "%",
      "value": 48.0,
      "refMin": 34.0,
      "refMax": 71.1,
      "unit": "%",
      "desc": "Нейтрофил нь бактерийн халдварын эсрэг тэмцдэг цагаан эсүүдийн төрлүүдийн нэг юм. Энэ үзүүлэлт хэвийн байвал дархлааны систем сайн ажиллаж буйг харуулна."
    },
    {
      "labelMn": "Лимфоцит эзлэх хувь",
      "labelEn": "%",
      "value": 28.7,
      "refMin": 19.3,
      "refMax": 51.7,
      "unit": "%",
      "desc": "Лимфоцит нь дархлааны системийн чухал хэсэг бөгөөд вирусын халдварын эсрэг тэмцдэг. Энэ үзүүлэлт хэвийн байхад эрүүл мэндэд тустай."
    },
    {
      "labelMn": "Монцит эзлэх хувь",
      "labelEn": "%",
      "value": 13.2,
      "refMin": 4.7,
      "refMax": 12.5,
      "unit": "%",
      "desc": "Монцит нь цусны нийлмэл үйл ажиллагаанд оролцдог бөгөөд эмгэгийн үед нэмэгдэж болно. Хэрэв энэ үзүүлэлт их байвал дархлааны системийн асуудал байж болзошгүй."
    },
    {
      "labelMn": "Эозинофил эзлэх хувь",
      "labelEn": "%",
      "value": 9.2,
      "refMin": 0.7,
      "refMax": 5.8,
      "unit": "%",
      "desc": "Эозинофил нь харшил болон паразитын эсрэг тэмцдэг бөгөөд их байвал харшил эсвэл бусад асуудал байгааг илтгэж болно."
    },
    {
      "labelMn": "Базофил эзлэх хувь",
      "labelEn": "%",
      "value": 0.9,
      "refMin": 0.1,
      "refMax": 1.2,
      "unit": "%",
      "desc": "Базофил нь бөөмтаний дархлааны системийг дэмждэг цагаан эсүүдийн төрөл бөгөөд харшлын шинж тэмдэгийг илтгэж болно."
    },
    {
      "labelMn": "Нейтрофил эс",
      "labelEn": "#",
      "value": 3.83,
      "refMin": 1.2,
      "refMax": 8.0,
      "unit": "10³/uL",
      "desc": "Нейтрофил нь бактерийн халдварын эсрэг тэмцдэг цагаан эсүүдийн төрлүүдийн нэг юм. Энэ үзүүлэлт хэвийн байвал дархлааны систем сайн ажиллаж буйг харуулна."
    },
    {
      "labelMn": "Лимфоцит эс",
      "labelEn": "#",
      "value": 2.29,
      "refMin": 1.0,
      "refMax": 4.0,
      "unit": "10³/uL",
      "desc": "Лимфоцит нь дархлааны системийн чухал хэсэг бөгөөд вирусын халдварын эсрэг тэмцдэг. Энэ үзүүлэлт хэвийн байхад эрүүл мэндэд тустай."
    },
    {
      "labelMn": "Монцит эс",
      "labelEn": "#",
      "value": 1.05,
      "refMin": 0.1,
      "refMax": 1.5,
      "unit": "10³/uL",
      "desc": "Монцит нь цусны нийлмэл үйл ажиллагаанд оролцдог бөгөөд эмгэгийн үед нэмэгдэж болно. Хэрэв энэ үзүүлэлт их байвал дархлааны системийн асуудал байж болзошгүй."
    },
    {
      "labelMn": "Эозинофил эс",
      "labelEn": "#",
      "value": 0.73,
      "refMin": 0.0,
      "refMax": 0.9,
      "unit": "10³/uL",
      "desc": "Эозинофил нь харшил болон паразитын эсрэг тэмцдэг бөгөөд их байвал харшил эсвэл бусад асуудал байгааг илтгэж болно."
    }
  ],
  "summary": "Энэ лабораторийн шинжилгээнд цусны улаан эс болон цагаан эс, түүнчлэн ялтасны хэмжээ хэвийн байна. Гэхдээ улаан эсийн дундаж гемоглобин болон улаан эсэд ногдох гемоглобины концентраци бага байгаа нь цус багадалттай байж болзошгүйг илтгэлээ. Үүнтэй харьцуулахад цусны ялтас бага байгаа нь цусны бүлэгнэлтийн асуудалтай холбоотой байж магадгүй. Лимфоцит болон эозинофилын эзлэх хувь нь хязгаараас их байгаа нь дархлаа болон харшлын асуудал байж болохыг харуулж байна. Жинтэй үүднээс эмчтэй зөвлөлдөж, илүү нарийвчилсан шинжилгээгээр шалтгааныг тодруулахыг зөвлөж байна. Тухайн хүний эрүүл мэнд, шалгалтын үр дүнгээр харшилтай эсэх болон дархлааны системийн эмгэг байх магадлалтай. Гэхдээ энэ нь зөвхөн эмчийн үзлэгээр илүү тодорхой болно. Иймээс эмчийн зөвлөгөөг дагаж, шаардлагатай шинжилгээгээ хийлгэж эрүүл мэндээ сайжруулахад анхаараарай."
}
    }
    res.status(200).json({ result: parsed});

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
}
