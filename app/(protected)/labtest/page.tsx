"use client";
import React, { useState } from "react";
import Step1 from "./_components/steps/step1";
import Step3 from "./_components/steps/step3";
import Step2 from "./_components/steps/step2";
import { Button } from "@/components/ui/button";
import { defineStepper } from '@stepperize/react';
import Link from "next/link";
import { motion } from "framer-motion";

const { useStepper, Scoped, steps } = defineStepper(
  { id: 'first', title: 'Ерөнхий мэдээлэл' },
  { id: 'second', title: 'Шинжилгээний төрөл' },
  { id: 'third', title: 'Хариу оруулах' },
  { id: 'last', title: 'Result' }
);

const LabTestsScreening: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      <div className="flex flex-col w-full h-full px-4">
        <Scoped>
          <ProgressBar />
          <Steps />
          <Actions />
        </Scoped>
      </div>
    </div>
  );
};

export default LabTestsScreening;

const Steps = () => {
  const stepper = useStepper();

  return (
    <div className="">
      {stepper.when('first', () => <Step1 />)}
      {stepper.when('second', () => <Step2 />)}
      {stepper.when('third', () => <Step3 onBack={stepper.prev} />)}
    </div>
  )
}

const Actions = () => {
  const stepper = useStepper();

  if (stepper.current.id === 'third' || stepper.current.id === 'last') {
    return null;
  }

  return !stepper.isLast ? (
    <div className="flex items-center sm:gap-20 gap-10 mx-auto mt-6 ">
      {stepper.isFirst ? <Link href="/">
        <Button
          // disabled={stepper.isFirst} 
          // handler={stepper.prev}
          variant="outline"
          // onClick={() => setOpen(false)}
          className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg"
        // size="large"
        >
          Буцах
        </Button>
      </Link> : <Button
        // disabled={stepper.isFirst}
        onClick={stepper.prev}
        variant="outline"
        className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg"
      // size="large"
      >
        <p className="text-lg">Өмнөх</p>
      </Button>}
      <Button
        onClick={stepper.next}
        className="bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white hover:scale-105 transition-all duration-300 rounded-lg"
      // size="large"
      >
        <p className="text-lg">Дараах</p>

      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2 mx-auto">
      <Button onClick={stepper.reset}>Дахин эхлэх</Button>
    </div>
  );
}

const ProgressBar: React.FC = () => {
  const stepper = useStepper();
  const currentIndex = steps.findIndex((s) => s.id === stepper.current.id);

  return (
    <div className="flex flex-row items-center justify-center mx-auto mt-4 mb-6">
      {steps.slice(0, -1).map((step, i) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`sm:w-12 w-8 sm:h-12 h-8 rounded-full flex items-center justify-center text-2xl font-semibold border transition-colors duration-500 ${currentIndex === i
                ? "bg-[#39ae9f] text-white border-green-600"
                : currentIndex > i
                  ? "bg-[#39ae9f] text-white border-green-500"
                  : "bg-white text-gray-500 border-gray-300"
                }`}
            >
              {i + 1}
            </div>
            <span className="text-sm sm:text-lg font-medium text-gray-700 items-center text-center justify-items-center">{step.title}</span>


          </div>
          {i < steps.length - 2 && (
            <div
              className={`w-10 sm:w-40 h-1 transition-all duration-500 ease-in-out ${currentIndex > i ? "bg-[#39ae9f]" : "bg-gray-300"
                }`}
            />

          )}
        </React.Fragment>
      )
      )}
    </div>
  );
}