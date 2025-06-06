'use client';
import { Button } from "@/components/ui/button";
import { BriefcaseMedical } from 'lucide-react';
import Card from "./card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Response({ privateInfo, symptoms }: { privateInfo: any, symptoms: any }) {
  const [result, setResult] = useState<any>()
  const router = useRouter();
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
    result ? (
      <div className="w-full h-full p-4 bg-white space-y-4 flex flex-col justify-between">
        <div className="mb-2 flex justify-center items-center space-x-2 text-2xl text-[#39ae9f] font-semibold">
          <BriefcaseMedical className="mr-2" />
          Өвчний шинж тэмдгүүдийн үнэлгээний дүн:
        </div>
        <div className="max-h-[66vh] overflow-y-auto ">
          <div className=" text-xl font-semibold">Дүгнэлт:</div>
          <p className="text-gray-700 text-lg">{result.result.summary}</p>
          <div className=" text-xl font-semibold">Үүсэх шалтгаанууд:</div>
          <ul>
            {result.result.causes.map((cause: any, index: number) => (
              <li key={index} className="mb-4">
                <Card cause={cause} ind={index} />
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <Button className="w-32 flex flex-cols items-center justify-center bg-[#39ae9f] cursor-pointer" onClick={() => router.push("/")} >
            Ойлголоо.
          </Button>
        </Link>
      </div>
    ) : (
      <div className="w-full h-[50vh] p-4 bg-white space-x-4 flex flex-row justify-center items-center">
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
      </div>
    )
  );
}