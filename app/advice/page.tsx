'use client'

import { useState } from 'react'
import PrivateInfoForm from './_components/private-info-form'
import SymptomsForm from './_components/Symptoms'
import Response from './_components/response'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
export default function WizardPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const progress = step === 1 ? 0 : step === 2 ? 50 : 100

  const handlePrivateInfoComplete = () => {
    setStep(2)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-10 overflow-hidden">
      <motion.header
        className="w-full flex items-center px-6 py-4 bg-white shadow-md rounded-xl mb-2 mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex text-2xl font-extrabold text-blue-700 gap-6">
          MedHelper
          <Link href="/">
            <ChevronLeft className="cursor-pointer pt-1" height={33} width={33} />
          </Link>
        </div>
      </motion.header>
      <div className="flex flex-row justify-center items-center w-full mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-300 min-h-screen">
        {/* Progress Bar */}
        <div className="flex flex-col items-center">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors duration-500 ${step === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : step > s
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}
              >
                {s}
              </div>

              {/* Connector Line */}
              {i < totalSteps - 1 && (
                <div
                  className={`w-px h-52 transition-all duration-500 ease-in-out ${step > s
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                    }`}
                />
              )}
            </div>
          ))}
        </div>


        {/* Step Content */}
        <div className='flex flex-col items-center ml-10'>
          <div className="p-6 w-2xl h-128 flex flex-col justify-center">
            {step === 1 && <PrivateInfoForm onComplete={handlePrivateInfoComplete} />}
            {step === 2 && <div><SymptomsForm onComplete={() => setStep(3)} onBack={() => setStep(1)} /></div>}
            {step === 3 && <div><Response /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
