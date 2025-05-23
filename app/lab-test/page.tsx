"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

import LabTestUpload from "./components/upload";
import Forms from "./components/forms"; 
import SpecimenSelection from "./components/specimen";
import TypeSelection from "./components/types"; 
type MedicalFormData = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  symptoms?: string;
};

const LabTestsScreening: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [medicalData, setMedicalData] = useState<MedicalFormData | null>(null);

  const totalSteps = 4;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleFormSubmit = (data: MedicalFormData) => {
    setMedicalData(data);
    setStep(2);
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-6 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.header
        className="w-full flex items-center px-6 py-4 bg-white shadow-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex text-2xl font-extrabold text-blue-700 gap-6">
          MedHelper
          <Image width={30} height={15} src="/logo.jpg" alt="logo" />
          <Link href="/">
            <ChevronLeft className="cursor-pointer pt-1" height={33} width={33} />
          </Link>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex flex-row justify-center items-center w-full h-auto mt-4 px-4">
        {/* Progress Bar */}
        <div className="flex flex-col items-center mr-10 mt-4">
          {[1, 2, 3, 4].map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold border transition-colors duration-500 ${
                  step === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : step > s
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-300"
                }`}
              >
                {s}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`w-px h-40 transition-all duration-500 ease-in-out ${
                    step > s ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex justify-center items-center w-full h-auto">
          <div className="w-full h-auto max-h-full overflow-y-auto p-6 bg-white rounded-xl shadow-md">
            {step === 1 && <Forms onSubmit={handleFormSubmit} />}
            {step === 2 && (  <SpecimenSelection onNext={() => setStep(3)} onBack={() => setStep(1)} />
)}
            {step === 3 && (
              <TypeSelection onNext={() => setStep(4)} onBack={() => setStep(2)} />
            )}

            {step === 4 && <LabTestUpload onBack={() => setStep(3)}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestsScreening;
