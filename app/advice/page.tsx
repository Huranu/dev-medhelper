'use client'

import { useState } from 'react'
import PrivateInfoForm from './_components/private-info-form'
import SymptomsForm from './_components/Symptoms'
import Response from './_components/response'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const [privateInfo, setPrivateInfo] = useState<any>(null)
  const [symptoms, setSymptoms] = useState<any>(null)
  const totalSteps = 3

  const handlePrivateInfoComplete = (data: any) => {
    setPrivateInfo(data)
    setStep(2)
  }

  const handleSymptomsComplete = (data: any) => {
    setSymptoms(data)
    setStep(3)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-6 overflow-hidden">
      <motion.header
        className="w-full flex items-center px-6 py-4 bg-white shadow-md rounded-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex text-2xl font-extrabold text-blue-700 gap-6">
          MedHelper
          <Image width={30} height={15} src="/logo.jpg" alt="logo" />
          <Link href="/">
            <ChevronLeft className="cursor-pointer pt-1" height={33} width={33} />
          </Link>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex flex-row justify-center items-center w-full h-full mt-50 px-4">
        {/* Progress Bar */}
        <div className="flex flex-col items-center mr-10">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-15 h-15 rounded-full flex items-center justify-center text-2xl font-semibold border transition-colors duration-500 ${step === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : step > s
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}
              >
                {s}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`w-px h-50 transition-all duration-500 ease-in-out ${step > s ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex justify-center items-center w-full max-w-5xl h-full">
          <div className="w-full h-auto max-h-full overflow-y-auto p-6 bg-white rounded-xl shadow-md">
            {step === 1 && <PrivateInfoForm onComplete={handlePrivateInfoComplete} />}
            {step === 2 && <SymptomsForm onComplete={handleSymptomsComplete} onBack={() => setStep(1)} />}
            {step === 3 && <Response privateInfo={privateInfo} symptoms={symptoms} />}
          </div>
        </div>
      </div>
    </div>
  )
}
