"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashCardBG from '@/components/dashcardbg';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const barChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
];

const lineChartData = [
  { name: 'Jan', value: 240 },
  { name: 'Feb', value: 139 },
  { name: 'Mar', value: 980 },
  { name: 'Apr', value: 390 },
  { name: 'May', value: 480 },
];

const DashboardClient = () => {
  return (
    <div className="h-full flex flex-grow">
      <div className="flex-1 grid grid-rows-12 gap-6 p-4 h-full">
        <div className="row-span-4 flex flex-col gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search . . ."
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
            <div className="col-span-2 rounded-md bg-white p-4">Analys 1</div>
            <div className="col-span-2 rounded-md bg-white p-4">Analys 2</div>
          </div>
        </div>
        <div className="row-span-2 grid grid-cols-3 gap-4">
          <div className="rounded-md bg-white p-4">AA</div>
          <div className="rounded-md bg-white p-4">AA</div>
          <div className="rounded-md bg-white p-4">AA</div>
        </div>
        <div className="row-span-6 grid grid-cols-5 gap-4 h-full">
          <div className="col-span-3 bg-white p-4 rounded-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Chart 1 - Bar Chart</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#39ae9f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-2 bg-white p-4 rounded-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Chart 2 - Line Chart</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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