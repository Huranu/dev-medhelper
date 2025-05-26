"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getLabtests } from "../labtest/result/_lib/queries";

const History: React.FC = () => {
   const [result, setResult] = useState<any>();
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
   const router = useRouter();

   useEffect(() => {
      const fetchALL = async () => {
         const res = await getLabtests();
         setResult(res);
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

         {/* {result ? ( */}
         <div className="flex flex-col w-full mx-auto pt-3 gap-4">
            <div className="mb-8">
               <h2 className="text-2xl font-semibold text-center">
                  Шинжилгээний түүх
               </h2>
            </div>

            <div className="w-full flex flex-col gap-4">
               <div
                  className="bg-white shadow-md rounded-lg p-8 flex flex-row justify-between hover:bg-gray-100"
                  onClick={() => {
                     router.push(`/historyitem?type=blood&count=${result}`);
                  }}
               >
                  <h2 className="text-xl font-semibold">Цусны шинжилгээ</h2>
                  <h2 className="text-xl font-semibold">{result}</h2>
               </div>
               <div
                  className="bg-white shadow-md rounded-lg p-8 flex flex-row justify-between hover:bg-gray-100"
                  onClick={() => {
                     router.push("/historyitem?type=urine");
                  }}
               >
                  <h2 className="text-xl font-semibold">Шээсний шинжилгээ</h2>
                  <h2 className="text-xl font-semibold">0</h2>
               </div>
            </div>
         </div>
      </div>
   );
};

export default History;
