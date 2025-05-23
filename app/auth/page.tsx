"use client"
import React from 'react'
import SignIn from './_components/signin'
import SignUp from './_components/signup'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '@/components/background'

const Auth = () => {
    const [page, setPage] = React.useState<"signin" | "signup">("signin")

    return (
        <div className="grid grid-cols-12 h-screen overflow-hidden relative">
            <AnimatePresence mode="wait">
                {page === "signin" ? (
                    <>
                        <motion.div
                            key="signin-form"
                            initial={{ x: 600, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 600, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="col-span-7 z-0"
                        >
                            <SignIn />
                        </motion.div>

                        <motion.div
                            key="signin-panel"
                            initial={{ x: -900, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -900, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="col-span-5 bg-primary flex items-center justify-center z-10 relative"
                        >
                            <AnimatedBackground asBackground={true} className="absolute inset-0"/>
                            <div className="relative z-10 text-center flex flex-col gap-8 text-white font-semibold">
                                <p className='text-6xl font-bold'>Сайн байна уу!</p>
                                <p>Та шинээр бүртгүүлэх бол доорх товчин дээр дарна уу.</p>
                                <Button 
                                    onClick={() => setPage("signup")} 
                                    variant={'ghost'} 
                                    className='rounded-full border py-6'
                                >
                                    Бүртгүүлэх
                                </Button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <>
                        <motion.div
                            key="signup-panel"
                            initial={{ x: 900, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 900, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="col-span-5 bg-primary flex items-center justify-center z-10 relative"
                        >
                            <AnimatedBackground asBackground={true} className="absolute inset-0"/>
                            <div className="relative z-10 text-center flex flex-col gap-8 text-white font-semibold">
                                <p className='text-6xl font-bold'>Сайн байна уу!</p>
                                <p>Та шинээр бүртгэлтэй бол нэвтэрнэ үү.</p>
                                <Button 
                                    onClick={() => setPage("signin")} 
                                    variant={'ghost'} 
                                    className='rounded-full border py-6'
                                >
                                    Нэвтрэх
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            key="signup-form"
                            initial={{ x: -600, opacity: 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -600, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="col-span-7 z-0"
                        >
                            <SignUp />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Auth
