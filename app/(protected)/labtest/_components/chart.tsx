"use client";
import React from "react";
import { CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export type Ref = {
  labelMn: string;
  labelEn: string;
  value: number;
  refMin: number;
  refMax: number;
  unit: string;
  desc: string;
};

const BloodWorkChart = ({ data }: { data: Ref[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <div className="w-full">
        <CardContent className="p-0">
          <div className="space-y-4">
            {data.map((item, index) => {
              const maxScaleValue =
                Math.max(item.value, item.refMin, item.refMax) * 1.1;
              const maxWidth = 100;
              const patientWidth = (item.value / maxScaleValue) * maxWidth;
              const refMinWidth = (item.refMin / maxScaleValue) * maxWidth;
              const refMaxWidth = (item.refMax / maxScaleValue) * maxWidth;

              return (
                <AccordionItem value={item.labelEn} key={index}>
                  <AccordionTrigger>
                    <div className="w-full py-4 px-3 bg-white grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_0.8fr_0.5fr_1.8fr] items-center gap-2 rounded-lg shadow-md">
                      <div className="items-start">
                        <span className="font-semibold text-gray-800 text-sm">
                          {item.labelMn}
                        </span>
                      </div>

                      <div className="items-start">
                        <span className="text-sm text-gray-700">
                          Хэвийн хэмжээ {item.refMin} - {item.refMax}{" "}
                          {item.unit}
                        </span>
                      </div>

                      <div className="items-start">
                        <span className="text-sm font-medium">
                          {item.value} {item.unit}
                        </span>
                      </div>

                      <div className="relative h-12 w-full hidden sm:block">
                        <div className="relative h-2 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2">
                          <div
                            className="absolute h-full bg-green-400 rounded-full"
                            style={{
                              left: `${refMinWidth}%`,
                              width: `${refMaxWidth - refMinWidth}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-red-300 rounded-full"
                            style={{
                              left: 0,
                              width: `${refMinWidth}%`,
                            }}
                          />
                          <div
                            className="absolute h-full bg-red-300 rounded-full"
                            style={{
                              left: `${refMaxWidth}%`,
                              width: `${100 - refMaxWidth}%`,
                            }}
                          />
                          <div
                            className="absolute w-4 h-4 bg-blue-500 rounded-full"
                            style={{
                              left: `${patientWidth}%`,
                              transform: "translateX(-50%) translateY(-50%)",
                              top: "50%",
                            }}
                          />
                        </div>

                        {item.value !== undefined && (
                          <>
                            <div
                              className="absolute text-xs text-gray-700"
                              style={{
                                left: `${patientWidth}%`,
                                transform: "translateX(-50%)",
                                bottom: "-0.5rem",
                              }}
                            >
                              {item.value}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <span className="text-sm px-4">{item.desc}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
            <p className="text-sm text-gray-600 mt-4">
              Ногоон: Хэвийн, Улаан: Анхаарах хэрэгтэй.
            </p>
          </div>
        </CardContent>
      </div>
    </Accordion>
  );
};

export default BloodWorkChart;