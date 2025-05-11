"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BloodWorkChart, { Ref } from "../components/chart";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BloodTestResult {
  explanation: string;
  recommendation: string;
}

interface BloodTestResults {
  [key: string]: BloodTestResult;
}

type LabTestResult = {
  indicators: Ref[];
  summary: string;
  details: BloodTestResults;
};

const Result: React.FC = () => {
  const [result, setResult] = useState<LabTestResult>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedResult = localStorage.getItem("labTestResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
      localStorage.removeItem("labTestResult");
    }
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
            <h2 className="text-4xl font-semibold mb-4 text-center">Дүгнэлт</h2>
            <div className="rounded-lg ml-5 p-6 max-h-[200px] overflow-y-auto">
              <p className="text-gray-700 text-2xl">{result.summary}</p>
            </div>
          </div>

          <div className="w-full flex flex-row lg:flex-row justify-evenly">
            <div className="w-[900px]">
              <h2 className="text-4xl font-semibold mb-4 text-center">Дэлгэрэнгүй</h2>
              <div className="bg-white shadow-md rounded-lg p-6 max-h-[600px] overflow-y-auto">
                {result.indicators.map((indicator: Ref, index: number) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 py-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {indicator.label}
                      </h3>
                      <span
                        className={
                          indicator.value < indicator.refMin ||
                          indicator.value > indicator.refMax
                            ? "text-red-500 font-semibold"
                            : "text-gray-600"
                        }
                      >
                        {indicator.value} {indicator.unit}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                      {result.details[indicator.label]?.explanation || "Нэмэлт мэдээлэл байхгүй байна."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[900px]">
              <h2 className="text-4xl font-semibold mb-4 text-center">
                Тоон үзүүлэлтийн график
              </h2>
              <div className="bg-white shadow-md rounded-lg p-6 max-h-[600px] overflow-y-auto">
                <BloodWorkChart data={result.indicators} />
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