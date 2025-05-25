"use client";
import React, { useState, useEffect } from "react";
import { Activity, Brain, History, Zap, ArrowRight, Sparkles, Heart } from "lucide-react";

export default function HomePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(timer);
        };
    }, []);

    const features = [
        {
            icon: Brain,
            title: "AI Advice",
            description: "Get intelligent health recommendations powered by advanced AI",
            gradient: "from-[#39ae9f] to-[#2c8c80]",
            href: "/advice",
        },
        {
            icon: Activity,
            title: "Lab Tests",
            description: "Smart analysis and interpretation of your medical tests",
            gradient: "from-[#39ae9f] to-[#2c8c80]",
            href: "/labtest",
        },
        {
            icon: History,
            title: "Health History",
            description: "Track and analyze your health journey over time",
            gradient: "from-[#39ae9f] to-[#2c8c80]",
            href: "/history",
        },
    ];

    const stats = [
        { label: "AI Consultations", value: "50K+", icon: Brain },
        { label: "Tests Analyzed", value: "25K+", icon: Activity },
        { label: "Users Helped", value: "10K+", icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-[#2c8c80] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#39ae9f] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#2c8c80] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-40 left-1/2 w-60 h-60 bg-[#39ae9f] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* Cursor follower */}
            <div
                className="fixed w-4 h-4 bg-[#39ae9f] rounded-full pointer-events-none z-50 opacity-30 transition-opacity duration-300"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transform: "translate3d(0, 0, 0)",
                }}
            ></div>

            {/* Header */}
            <header className="relative z-10 p-6">
                <nav className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent">
                            MedHelper AI
                        </span>
                    </div>
                    <div className="text-sm text-gray-300">{currentTime.toLocaleTimeString()}</div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 px-6 pt-20 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8">
                            <Sparkles className="w-4 h-4 text-[#39ae9f]" />
                            <span className="text-sm text-gray-200">Powered by Advanced AI Technology</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent">
                            Your AI Health
                            <br />
                            <span className="bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent">
                                Companion
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                            Experience the future of healthcare with our intelligent AI assistant. Get personalized advice, analyze lab
                            results, and track your health journey with cutting-edge artificial intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#39ae9f]/25">
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Start Your Journey</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            </button>

                            <button className="px-8 py-4 border border-white/20 rounded-2xl font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center group">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#39ae9f]/20 to-[#2c8c80]/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8 text-[#39ae9f]" />
                                    </div>
                                    <div className="text-4xl font-bold bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                    <div className="relative z-10">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#39ae9f] transition-colors">{feature.title}</h3>

                                        <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>

                                        <div className="flex items-center text-[#39ae9f] group-hover:translate-x-2 transition-transform duration-300">
                                            <span className="font-semibold">Explore</span>
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>

                                    {/* Hover glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#39ae9f]/20 to-[#2c8c80]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* AI Status Indicator */}
                    <div className="mt-20 text-center">
                        <div className="inline-flex items-center space-x-3 bg-green-500/10 backdrop-blur-md rounded-full px-6 py-3 border border-green-500/20">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 font-semibold">AI System Online</span>
                            <Zap className="w-4 h-4 text-green-400" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}