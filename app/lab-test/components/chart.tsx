"use client";
import React from "react";
import { CardContent } from "@/components/ui/card";

export type Ref = {
  label: string;
  value: number;
  refMin: number;
  refMax: number;
  unit : string
}

const BloodWorkChart = ({data} : {data : Ref[]}) => {

  return (
    <div className="w-full max-w-4xl">
      <CardContent>
        <div className="space-y-6">
          {data.map((item, index) => {
            const maxScaleValue = Math.max(item.value, item.refMin, item.refMax) * 1.1;
            const maxWidth = 100;
            const patientWidth = (item.value / maxScaleValue) * maxWidth;
            const refMinWidth = (item.refMin / maxScaleValue) * maxWidth;
            const refMaxWidth = (item.refMax / maxScaleValue) * maxWidth;
            const textPosition = (refMinWidth + refMaxWidth) / 2;

            const isOutOfRange = item.value < item.refMin || item.value > item.refMax;
            const barColor = isOutOfRange ? "bg-red-500" : "bg-green-500";
            const statusText = isOutOfRange ? "⚠ Өндөр" : "✓ Эрүүл";
            const statusColor = isOutOfRange ? "text-red-600" : "text-green-600";

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="flex items-center">
                    <span className="font-bold mr-2">{item.label}:</span>
                  </span>
                  <span className="flex items-center">
                    {item.value} {item.unit}
                    <span className={`ml-2 ${statusColor}`}>
                      {statusText}
                    </span>
                  </span>
                </div>

                <div className="relative h-6 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-blue-200 rounded-full"
                    style={{
                      left: `${refMinWidth}%`,
                      width: `${refMaxWidth - refMinWidth}%`,
                    }}
                  />
                  <span
                    className="absolute text-xs text-gray-700"
                    style={{
                      left: `${textPosition}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    Эрүүл хязгаар
                  </span>
                </div>

                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-300`}
                    style={{ width: `${patientWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-sm text-gray-600 mt-4">
            Ногоон: Эрүүл, Улаан: Анхаарал хэрэгтэй. Эрүүл хязгаар дотор байвал сайн!
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default BloodWorkChart;