"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react"; // Add icons for clarity

const BloodWorkChart: React.FC = () => {
  // Simplified data with friendly labels
  const data = [
    { label: "Цагаан эс (WBC)", value: 8.86, refMin: 4, refMax: 8, unit: "10³/µL" },
    { label: "Улаан эс (RBC)", value: 4.69, refMin: 3.5, refMax: 5.5, unit: "10⁶/µL" },
    { label: "Хүчилтөрөгчийн түвшин (HGB)", value: 13.7, refMin: 12, refMax: 16, unit: "g/dL" },
    { label: "Бусад эс (NEUT#)", value: 6.26, refMin: 1.30, refMax: 5.32, unit: "10³/µL" },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Таны Цусны Шинжилгээ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((item, index) => {
            // Normalize values to percentages based on refMax
            const maxWidth = 100; // Maximum bar width as percentage
            // Increase cap to 200% to make the bar longer for values exceeding refMax
            const patientWidth = Math.min((item.value / item.refMax) * 100, 200); // Increased from 150% to 200%
            const refMinWidth = (item.refMin / item.refMax) * 100;
            const refMaxWidth = 100;

            // Check if value is out of range
            const isOutOfRange = item.value < item.refMin || item.value > item.refMax;
            const barColor = isOutOfRange ? "bg-red-500" : "bg-green-500";
            const statusText = isOutOfRange ? "⚠ Өндөр" : "✓ Эрүүл";
            const statusColor = isOutOfRange ? "text-red-600" : "text-green-600";

            return (
              <div key={index} className="space-y-2">
                {/* Label, Value, and Status */}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="flex items-center">
                    {/* Title in front of the label */}
                    <span className="font-bold mr-2">{item.label}:</span>
                  </span>
                  <span className="flex items-center">
                    {item.value} {item.unit}
                    <span className={`ml-2 ${statusColor}`}>
                      {statusText}
                    </span>
                  </span>
                </div>

                {/* Reference Range Bar (Healthy Range) */}
                <div className="relative h-6 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-blue-200 rounded-full"
                    style={{
                      left: `${refMinWidth}%`,
                      width: `${refMaxWidth - refMinWidth}%`,
                    }}
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-700">
                    Эрүүл хязгаар
                  </span>
                </div>

                {/* Patient Value Bar */}
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
    </Card>
  );
};

export default BloodWorkChart;