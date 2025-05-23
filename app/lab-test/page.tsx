"use client";
import React, { useState } from "react";

import LabTestUpload from "./components/upload";
import Forms from "./components/forms";
import SpecimenSelection from "./components/specimen";
import TypeSelection from "./components/types";

import Button from "./components/button";
import  {defineStepper } from '@stepperize/react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

const { useStepper, Scoped, steps } = defineStepper(
  { id: 'first', title: 'Ерөнхий мэдээлэл' },
  { id: 'second', title: 'Сорьц сонгох' },
  { id: 'third', title: 'Шинжилгээний төрөл' },
  { id: 'fourth', title: 'Хариу оруулах' },
  { id: 'last', title: 'Result' }
);

const LabTestsScreening: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  return (
    // <div className="static flex flex-col gap-4 p-4 mt-1 rounded-md w-full h-full mx-auto">
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
        className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mx-auto w-full"
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
    <div className="flex flex-col items-center justify-center w-full h-full mt-50 px-4">
      <Scoped>
        <ProgressBar />
        <Steps/>
        <Actions/>
      </Scoped>
    </div>
    </div>
    // </div>
  );
};

export default LabTestsScreening;

const Steps = () => {
  const stepper = useStepper();
  // const currentStep = stepper.current;

  // const isLastStep = stepper.isLast;
  
  return (
    <div className="">
      {stepper.when('first', () => <Forms />)}
      {stepper.when('second', () => <SpecimenSelection />)}
      {stepper.when('third', () => <TypeSelection />)}
      {stepper.when('fourth', () => <LabTestUpload onBack={stepper.prev}/>)}
    </div>
  )
}

const Actions = () => {
  const stepper = useStepper();

  if (stepper.current.id === 'fourth' || stepper.current.id === 'last') {
    return null;
  }

  return !stepper.isLast ? (
    <div className="flex items-center sm:gap-20 gap-10 mx-auto">
      {stepper.isFirst ? <Link href="/">
        <Button
        // disabled={stepper.isFirst} 
        // handler={stepper.prev}
        className="cursor-pointer border-purple-700 bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent w-35 h-15"
        size="large">
          Буцах
        </Button>
      </Link> : <Button
      disabled={stepper.isFirst} 
      handler={stepper.prev}
      className="cursor-pointer border-purple-700 bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent w-35 h-15"
      size="large">
        Өмнөх
      </Button>}


      <Button  
      handler={stepper.next}
      className="w-35 h-15"
      size="large"
      >
        Дараах
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2 mx-auto">
      <Button handler={stepper.reset}>Дахин эхлэх</Button>
    </div>
  );
}

const ProgressBar: React.FC = () => {
  const stepper = useStepper();
  const currentIndex = steps.findIndex((s) => s.id === stepper.current.id);

  return (
    <div className="flex flex-row items-center justify-center mx-auto">
      {steps.slice(0, -1).map((step, i) => (
        <div key={step.id} className="flex flex-row items-center">
          {/* <span className="mb-1 text-xs font-medium text-gray-700">{step.title}</span> */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold border transition-colors duration-500 ${
              currentIndex === i
                ? "bg-blue-600 text-white border-blue-600"
                : currentIndex > i
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {i + 1}
          </div>
          {i < steps.length - 2 && (
            <div
              className={`w-12 sm:w-30 h-0.5 transition-all duration-500 ease-in-out ${
                currentIndex > i ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}