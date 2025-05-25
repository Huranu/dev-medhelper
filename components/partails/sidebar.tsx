import { HeartPlusIcon, HomeIcon, TestTubeIcon, LightbulbIcon, HistoryIcon } from 'lucide-react';
import SignOutButton from '@/app/auth/_components/button/signout-button'
import Link from 'next/link'
import React from 'react'

const sidebaritems = [
    { id: 1, link: '/', name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" /> },
    { id: 2, link: '/labtest', name: 'Labtest', icon: <TestTubeIcon className="h-5 w-5" /> },
    { id: 3, link: '/advice', name: 'Advice', icon: <LightbulbIcon className="h-5 w-5" /> },
    { id: 4, link: '/history', name: 'History', icon: <HistoryIcon className="h-5 w-5" /> },
];

const SideBar = () => {
    return (
        <div className="w-[240px] p-4 flex flex-col h-full">
            <div className="flex items-center justify-center mb-6">
                <HeartPlusIcon className="h-8 w-8" />
            </div>
            <nav className="flex-1 flex flex-col justify-between space-y-2">
                <div className="flex flex-col space-y-2">
                    {sidebaritems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="flex items-center p-2 hover:bg-emerald-200 rounded-md transition-colors"
                        >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
                <SignOutButton />
            </nav>
        </div>
    )
}

export default SideBar