"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashCardBG from '@/components/dashcardbg';
import {
  BarChart, Bar, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line,
  ReferenceArea,
}
  from 'recharts';

const labtestCountByMonth = [
  { name: '1-р сар', value: 1 },
  { name: '2-р сар', value: 0 },
  { name: '3-р сар', value: 0 },
  { name: '4-р сар', value: 3 },
  { name: '5-р сар', value: 5 },
];

const cholesterolData = [
  { name: '1-р сар', value: 180 },
  { name: '2-р сар', value: 180 },
  { name: '3-р сар', value: 180 },
  { name: '4-р сар', value: 195 },
  { name: '5-р сар', value: 182 },
];

const hemoglobinData = [
  { name: '1-р сар', value: 14.5 },
  { name: '2-р сар', value: 13.8 },
  { name: '3-р сар', value: 14.0 },
  { name: '4-р сар', value: 15.2 },
  { name: '5-р сар', value: 14.8 },
];

const glucoseData = [
  { name: '1-р сар', value: 95 },
  { name: '2-р сар', value: 90 },
  { name: '3-р сар', value: 100 },
  { name: '4-р сар', value: 105 },
  { name: '5-р сар', value: 98 },
];

const ranges = {
  hemoglobin: { min: 12, max: 18 },
  glucose: { min: 70, max: 100 },
  cholesterol: { min: 125, max: 200 },
  labTestCount: { min: 0, max: 10 },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white/90 border-none rounded-lg shadow-md p-2 text-sm text-gray-900">
        {`${name}, ${value}`}
      </div>
    );
  }
  return null;
};

const MiniLineChart = ({ data, color, type }: { data: { name: string; value: number }[]; color: string; type: "hemoglobin" | "glucose" }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <ReferenceArea
          y1={type === "hemoglobin" ? ranges.hemoglobin.min : ranges.glucose.min}
          y2={type === "hemoglobin" ? ranges.hemoglobin.max : ranges.glucose.max}
          fill={type === "hemoglobin" ? "#FCA5A5" : "#39ae9f"}
          fillOpacity={0.1}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 4, fill: color }}
          activeDot={{ r: 6 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: '#333',
          }}
          content={<CustomTooltip />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DashboardClient = () => {
  return (
    <div className="h-full flex flex-grow">
      <div className="flex-1 grid grid-rows-12 gap-6 p-4 h-full">
        <div className="row-span-4 flex flex-col gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Хайх . . ."
              className="pl-8 w-[320px] bg-white"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4" />
          </div>
          <div className="flex-1 grid grid-cols-12 gap-6">
            <div className="col-span-8 bg-[#39ae9f] p-6 rounded-md relative z-10">
              <DashCardBG asBackground={true} className="absolute inset-0 rounded-md" />
              <div className="relative z-10 flex flex-col gap-8 text-white font-semibold">
                <p className="text-2xl font-semibold font-mono z-10">Өдрийн мэнд, {"Guest"}!</p>
              </div>
            </div>
            <div className="col-span-2 bg-white p-4 rounded-md flex flex-col">
              <h3 className="text-xl font-semibold text-[#FCA5A5]">Гемоглобин -18%</h3>
              <div className="flex-1">
                <MiniLineChart data={hemoglobinData} color="#FCA5A5" type="hemoglobin" />
              </div>
            </div>
            <div className="col-span-2 bg-white p-4 rounded-md flex flex-col">
              <h3 className="text-xl font-semibold text-[#39ae9f]">Глюкоз +2%</h3>
              <div className="flex-1">
                <MiniLineChart data={glucoseData} color="#39ae9f" type="glucose" />
              </div>
            </div>
          </div>
        </div>
        <div className="row-span-2 grid grid-cols-3 gap-4 text-white">
          <div className="rounded-md bg-red-300 p-4">Appointments today</div>
          <div className="rounded-md bg-amber-400 p-4">New patients</div>
          <div className="rounded-md bg-[#39ae9f] p-4">Total patients</div>
        </div>
        <div className="row-span-6 grid grid-cols-5 gap-4 h-full">
          <div className="col-span-3 bg-white p-4 rounded-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Шинжилгээний тоо (Сараар)</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={labtestCountByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="#39ae9f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-2 bg-white p-4 rounded-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Холестерин</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cholesterolData} >
                  <ReferenceArea
                    y1={ranges.cholesterol.min}
                    y2={ranges.cholesterol.max}
                    fill={"#39ae9f"}
                    fillOpacity={0.1}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#39ae9f" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;