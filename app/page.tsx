import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashCardBG from '@/components/dashcardbg';
import SideBar from '@/components/partails/sidebar';

const Dashboard = () => {

  return (
    <div className="flex flex-grow h-screen">
      <SideBar />
      <div className="flex-1 flex flex-grow">
        <div className="flex-1 grid grid-rows-12 gap-6 p-4 bg-[#F2F8FC]">
          <div className='row-span-4 flex flex-col gap-4'>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search . . ."
                className="pl-8 w-[320px] bg-white"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4" />
            </div>
            <div className='flex-1 grid grid-cols-12 gap-6'>
              <div className='col-span-8 bg-[#39ae9f] p-6 rounded-md relative z-10'>
                <DashCardBG asBackground={true} className="absolute inset-0 rounded-md" />
                <div className="relative z-10 flex flex-col gap-8 text-white font-semibold">
                  <p className='text-2xl font-semibold font-mono z-10'>Өдрийн мэнд, User!</p>
                </div>
              </div>
              <div className='col-span-2 rounded-md bg-white p-4'>Analys 1</div>
              <div className='col-span-2 rounded-md bg-white p-4'>Analys 2</div>
            </div>
          </div>
          <div className='row-span-2 grid grid-cols-3 gap-4'>
            <div className='rounded-md bg-white p-4'>AA</div>
            <div className='rounded-md bg-white p-4'>AA</div>
            <div className='rounded-md bg-white p-4'>AA</div>
          </div>
          <div className='row-span-6 grid grid-cols-5 gap-4'>
            <div className='col-span-3 bg-white p-4 rounded-md'>Chart 1</div>
            <div className='col-span-2 bg-white p-4 rounded-md'>Chart 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;