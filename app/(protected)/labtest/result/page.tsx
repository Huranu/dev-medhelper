"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BloodWorkChart from "../_components/chart";
import CloseDialog from "./_components/closedialog";
import SaveDialog from "./_components/savedialog";

const Result: React.FC = () => {
  const [result, setResult] = useState<any>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!result) {
      const storedResult = localStorage.getItem("labTestResult");
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      }
    }
  }, []);

  useEffect(() => {
    if (result) {
      localStorage.removeItem("labTestResult");
    }
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

      {result ? (
        <div className="flex flex-col w-full mx-auto pt-3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Шинжилгээний хариуны дүгнэлт</h2>
            <div className="ml-5 py-2 px-8 flex flex-row gap-8">
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

              <div className="flex gap-4 justify-end">
                <CloseDialog />
                <SaveDialog result={result} />
              </div>
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