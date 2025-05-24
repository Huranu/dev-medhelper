"use client";
import React, { useState } from "react";

import LabTestUpload from "./components/upload";
import Forms from "./components/forms";
import SpecimenSelection from "./components/specimen";
import TypeSelection from "./components/types";

import { Button } from "@/components/ui/button";
import  {defineStepper } from '@stepperize/react';

const { useStepper, Scoped, steps } = defineStepper(
  { id: 'first', title: 'Ерөнхий мэдээлэл' },
  { id: 'second', title: 'Сорьц сонгох' },
  { id: 'third', title: 'Шинжилгээний төрөл' },
  { id: 'fourth', title: 'Хариу оруулах' },
  { id: 'last', title: 'Result' }
);

const LabTestsScreening: React.FC = () => {
  return (
    <div className=" flex flex-col gap-4 p-4 my-4 rounded-md w-full">
        
    <Scoped>
      <ProgressBar />
      <Steps/>
      <Actions/>
    </Scoped>
    </div>
  );
};

export default LabTestsScreening;

const Steps = () => {
  const stepper = useStepper();
  const currentStep = stepper.current;

  return (
    <div className="">
      {stepper.when('first', () => <Forms />)}
      {stepper.when('second', () => <SpecimenSelection />)}
      {stepper.when('third', () => <TypeSelection />)}
      {stepper.when('fourth', () => <LabTestUpload />)}
    </div>
  )
}

const Actions = () => {
  const stepper = useStepper();

  return !stepper.isLast ? (
    <div className="flex items-center gap-2 mx-auto">
      <Button onClick={stepper.prev} disabled={stepper.isFirst}>
        Өмнөх
      </Button>

      <Button onClick={stepper.next}>
        {stepper.when(
          'fourth',
          () => 'Илгээх',
          () => 'Дараах'
        )}
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button onClick={stepper.reset}>Дахин эхлэх</Button>
    </div>
  );
}

const ProgressBar: React.FC = () => {
  const stepper = useStepper();
  const currentIndex = steps.findIndex((s) => s.id === stepper.current.id);

  return (
    <div className="flex flex-row items-center justify-center mr-10 mt-4 gap-4">
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
              className={`w-10 h-1 my-1 transition-all duration-500 ease-in-out ${
                currentIndex > i ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}