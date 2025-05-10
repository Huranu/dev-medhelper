"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BloodWorkChart, { Ref } from "../components/chart";
import { ChevronLeft} from "lucide-react";
import Link from "next/link";

type LabTestResult = {
  indicators: Ref[];
  summary:Ref;
  details:Ref;
}

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
    <div className="flex flex-col relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-4 overflow-hidden" onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 mix-blend-overlay blur-3xl"
          animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>
      <motion.header
            className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex text-2xl font-extrabold text-blue-700 gap-6">MedHelper
                <Link href="/lab-test">
                  <ChevronLeft className="cursor-pointer pt-1" height={33} width={33}/>
                </Link>
            </div>
      </motion.header>
      {result ? (
        <BloodWorkChart data={result.indicators} />
      ) : (
        <p>No results available. Please upload a lab test image.</p>
      )}
    </div>
  );
};

export default Result;