"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BloodWorkChart from "../_components/chart";

const Result: React.FC = () => {
  const [result, setResult] = useState<any>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedResult = localStorage.getItem("labTestResult");
    console.log(storedResult)
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      localStorage.removeItem("labTestResult");
    }
    setResult(
      {
        indicators: [
          {
            label: 'Цагаан цусны эс (WBC)',
            value: 8.86,
            refMin: 4,
            refMax: 8,
            unit: '10³/µL',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга нь дээд хязгаараас бага зэрэг давна. Энэ нь яаралтай шуурхай бэртэл, үрэвслийн эсвэл халдварт өвчинтэй холбоотой байж болно.'
          },
          {
            label: 'Улаан цусны эс (RBC)',
            value: 4.69,
            refMin: 3.5,
            refMax: 5.5,
            unit: '10⁶/µL',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга нь хэвийн байна. Эрүүл хүний улаан цусны эсүүдийн түвшин зохистой байна.'
          },
          {
            label: 'Гемоглобин (HGB)',
            value: 140,
            refMin: 115,
            refMax: 165,
            unit: 'g/L',
            prevValue: 42,
            currentValue: 15,
            desc: "Энэ утга хэвийн байна. Энэ нь цусны хүчилтөрөгч зөөвөрлөх чадвар сайн гэсэн үг."
          },
          {
            label: 'Гематокрит (HCT)',
            value: 41.3,
            refMin: 35,
            refMax: 48,
            unit: '%',
            prevValue: 42,
            currentValue: 15,
            desc: "Энэ утга нь хэвийн хүрээнд байна. Цусны улаан эсийн эзлэх хувь сайн байна."
          },
          {
            label: 'Дундаж биетэвч (MCV)',
            value: 88.1,
            refMin: 86,
            refMax: 100,
            unit: 'fL',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга хэвийн байна. Цусны эсийн дундаж хэмжээ зохистой.'
          },
          {
            label: 'Дундаж цус задлагч (MCH)',
            value: 29.9,
            refMin: 27,
            refMax: 32,
            unit: 'pg',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга хэвийн байна. Энэ нь цусны эсүүдийн дундаж гемоглобиний агууламж зохистой байна гэсэн үг.'
          },
          {
            label: 'Дундаж цус задлагч концентрац (MCHC)',
            value: 342,
            refMin: 310,
            refMax: 370,
            unit: 'g/L',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга хэвийн байна. Цусны эсүүдийн дундаж гемоглобиний концентрацийн түвшин зохистой байна.'
          },
          {
            label: 'Хавтгай цусны хавтгай эсүүд (PLT)',
            value: 191,
            refMin: 150,
            refMax: 400,
            unit: '10³/µL',
            prevValue: 42,
            currentValue: 15,
            desc: 'Энэ утга хэвийн байна. Энэ нь цус тогтвортой, зөв коагуляцийн чадавхид байна гэсэн үг.'
          }
        ],
        summary: 'Таны цусны шинжилгээний ихэнх утгууд хэвийн байгаа боловч цагаан цусны эсүүд дээд хязгаараас бага зэрэг давсан байна. Энэ нь өвчин, бэртэл эсвэл үрэвслийн үед тохиолдож болох юм. Тохиолдолын чихахгүй зовиур байгаа эсэхийг ажиглаж, шаардлага гарвал нарийн шинжилгээ хийлгэх нь зүйтэй байна. Амин дэм, эрүүл хоол хүнсийг хангалттай хэмжээгээр авахыг зөвлөж байна.'
      }
    )
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="flex flex-col relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-4 sm:px-14 py-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 mix-blend-overlay blur-3xl"
          animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>

      <motion.header
        className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-2 mx-auto w-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex text-2xl font-extrabold text-blue-700 gap-6">
          MedHelper
          <Image width={30} height={15} src="/logo.jpg" alt="" />
          <Link href="/lab-test">
            <ChevronLeft className="cursor-pointer pt-1" height={33} width={33} />
          </Link>
        </div>
      </motion.header>

      {result ? (
        <div className="flex flex-col w-full mx-auto pt-3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Шинжилгээний хариуны дүгнэлт</h2>
            <div className="ml-5 py-2 px-8 flex flex-row gap-8">
              {/* <Image src="/result_robot.png" alt="resultRobot" width={120} height={50} className="hidden sm:object-contain" /> */}
              <Image
                src="/result_robot.png"
                alt="resultRobot"
                width={120}
                height={50}
                className="hidden sm:object-contain"
              />
              <p className="text-gray-700 text-lg">{result.summary}</p>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white shadow-md rounded-lg p-4">
              <BloodWorkChart data={result.indicators} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
          <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
        </div>
      )}
    </div>
  );
};

export default Result;