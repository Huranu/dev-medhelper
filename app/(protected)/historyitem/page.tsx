"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BloodWorkChart, { HistoryRef } from "../labtest/_components//prev-chart";
import { getAllLabtests } from "../labtest/result/_lib/queries";
// import { useSearchParams } from "next/navigation";
// import { LabTestType } from "@/app/prisma";
//
const HistoryItem: React.FC = () => {
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const [labtests, setLabtests] = useState<any>();
   // const searchParams = useSearchParams();
   // const type = searchParams?.get("type") as LabTestType;
   // const count = searchParams!.get("count") as LabTestType;

   useEffect(() => {
      const fetchALL = async () => {
         const result = await getAllLabtests("blood");
         // console.log(type);
         const data = JSON.parse(result);
         const historyRefs: HistoryRef[] = data.labTestIndicators.map(
            (indicator: any) => ({
               labelMn: indicator.labelMn,
               labelEn: indicator.labelEn,
               type: indicator.type,
               value: parseFloat(indicator.value),
               refMin: parseFloat(indicator.refMin),
               refMax: parseFloat(indicator.refMax),
               unit: indicator.unit,
               desc: indicator.desc,
               date: indicator.createdAt,
            }),
         );
         console.log(historyRefs);

         setLabtests(historyRefs);
      };

      fetchALL();
   }, []);

   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      setMousePos({ x: e.clientX, y: e.clientY });
   };

   return (
      <div
         className="flex flex-col relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-4 overflow-hidden"
         onMouseMove={handleMouseMove}
      >
         <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
            <motion.div
               className="absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 mix-blend-overlay blur-3xl"
               animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
               transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />
         </motion.div>

         {labtests ? (
            <div className="flex flex-col w-full mx-auto pt-3">
               <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-center">
                     Цусны шинжилгээний түүх
                  </h2>
               </div>

               <div className="w-full">
                  <div className="bg-white shadow-md rounded-lg p-4">
                     <BloodWorkChart data={labtests} count={6} />
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

export default HistoryItem;
