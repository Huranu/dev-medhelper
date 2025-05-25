"use client";

import React from 'react';
import { History, Search, TestTube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashCardBG from '@/components/dashcardbg';
import {
  BarChart, Bar, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line,
  ReferenceArea,
  YAxis,
}
  from 'recharts';
import Link from 'next/link';
import { TbBulb } from 'react-icons/tb';
import { MdOutlineHealthAndSafety } from "react-icons/md";

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
  const min = type === "hemoglobin" ? ranges.hemoglobin.min : ranges.glucose.min;
  const max = type === "hemoglobin" ? ranges.hemoglobin.max : ranges.glucose.max;
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
        <YAxis
          hide={true}
          domain={[min - 40, max + 40]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DashboardClient = () => {
  const userName = "Guest"
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
                <div className="flex items-center space-x-4">
                  <MdOutlineHealthAndSafety className="text-3xl text-white/90" />
                  <p className="text-2xl font-semibold font-mono z-10" aria-label={`Welcome message for ${userName}`}>
                    Өдрийн мэнд, {userName}!
                  </p>
                </div>
                <p className="text-md leading-relaxed">
                  Манай хиймэл оюун ухаанд суурилсан аналитикийн платформ нь таны эрүүл мэндийн шинжилгээний хариуг хурдан бөгөөд өндөр нарийвчлалтайгаар боловсруулж, танд хамгийн сүүлийн үеийн технологийн дэмжлэгтэйгээр эрүүл мэндийн талаарх гүнзгий ойлголтыг өгнө. Таны шинжилгээний өгөгдлийг найдвартай хадгалж, түүхээ хянах боломжийг олгоно. Одоо шинжилгээ оруулж, AI-ийн тусламжтайгаар эрүүл мэндийн зөвлөгөө аваарай!
                </p>
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
          <Link
            href="/labtest"
            className="relative group rounded-xl p-6 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-700 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-white/20 transition-opacity duration-500" />
            <div className="relative flex items-center space-x-4">
              <TestTube className="text-3xl text-white/90 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-lg font-bold tracking-wide">Шинжилгээ</p>
                <p className="text-sm opacity-80">
                  AI-д суурилсан лабораторийн шинжилгээний хариуг хурдан бөгөөд нарийвчлалтайгаар хянах
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300" />
          </Link>
          <Link
            href="/advice"
            className="relative group rounded-xl p-6 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-700 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-white/20 transition-opacity duration-500" />
            <div className="relative flex items-center space-x-4">
              <TbBulb className="text-3xl text-white/90 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-lg font-bold tracking-wide">Зөвлөгөө</p>
                <p className="text-sm opacity-80">
                  Хиймэл оюун ухаанаар өгөгдсөн эрүүл мэндийн зөвлөгөө ба урьдчилан сэргийлэх арга
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300" />
          </Link>

          <Link
            href="/history"
            className="relative group rounded-xl p-6 bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-white/20 transition-opacity duration-500" />
            <div className="relative flex items-center space-x-4">
              <History className="text-3xl text-white/90 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-lg font-bold tracking-wide">Түүх</p>
                <p className="text-sm opacity-80">
                  Таны шинжилгээний түүхийг AI-д суурилсан аналитикаар хянах ба хадгалах
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300" />
          </Link>
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
                  <YAxis
                    hide={true}
                    domain={[ranges.cholesterol.min - 40, ranges.cholesterol.max + 40]}
                  />
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