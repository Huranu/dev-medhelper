'use client';
import { Button } from "@/components/ui/button";
import { BriefcaseMedical, Car } from 'lucide-react';
import Card from "./card";
import { useEffect, useState } from "react";

export default function Response({ privateInfo, symptoms }: { privateInfo: any, symptoms: any }) {
    const [result, setResult] = useState<any>()
  
  async function sendReq() {
  try {
    const formData = new FormData();
    formData.append("privateInfo", JSON.stringify(privateInfo));
    formData.append("symptoms", symptoms);

    const res = await fetch("/api/advice", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const resp = await res.json();
    console.log("AI response:", resp);
    setResult(resp)
  } catch (err) {
    console.error("Error:", err);
  }
}

  useEffect(() => {
    console.log("Private Info:", privateInfo);
    console.log("Symptoms:", symptoms);
    sendReq();

  }, [privateInfo, symptoms]);
  return (
    <div className="w-full h-[77vh] p-4 bg-white rounded-xl shadow space-y-4 flex flex-col justify-between">
      <div className="mb-2 flex justify-center items-center space-x-2 text-2xl text-blue-600 font-semibold">
        <BriefcaseMedical className="mr-2" />
        Өвчний шинж тэмдгүүдийн үнэлгээний дүн:
      </div>
      <div>
        <div className="text-blue-500 text-2xl font-semibold">Дүгнэлт:</div>
        <p className="text-gray-700 text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ea voluptate alias aliquam praesentium natus sequi possimus autem dolore ullam provident rem, soluta commodi odit accusantium neque nemo error inventore blanditiis nostrum temporibus cum nobis nihil. Quod placeat voluptatibus dicta aspernatur dolorem beatae. Quos totam perspiciatis porro, eligendi quis ratione.</p>
        <div className="text-blue-500 text-2xl font-semibold">Үүсэх шалтгаанууд:</div>
        <ul>
          <li><Card /></li>
          <li><Card /></li>
          <li><Card /></li>
        </ul>
      </div>
      <Button className="w-32 flex flex-cols items-center justify-center hover:bg-blue-500 bg-blue-700" >
        Ойлголоо.
      </Button>
    </div>
  );
}