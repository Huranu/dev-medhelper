'use client'

import { useState } from 'react'
import PrivateInfoForm from './_components/private-info-form'
import SymptomsForm from './_components/Symptoms'
import Response from './_components/response'

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
      <div className="flex flex-row justify-center items-center w-full h-full sm:px-4">
        <div className="sm:flex hidden flex-col items-center mr-10">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`w-15 h-15 rounded-full flex items-center justify-center text-2xl font-semibold border transition-colors duration-500 ${step === s
                  ? 'bg-[#39ae9f] text-white'
                  : step > s
                    ? 'bg-[#39ae9f] text-white'
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}
              >
                {s}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`w-px h-50 transition-all duration-500 ease-in-out ${step > s ? 'bg-[#39ae9f]' : 'bg-gray-300'
                    }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center w-full max-w-5xl h-full">
          <div className="w-full h-auto max-h-full overflow-y-auto sm:p-6 bg-white rounded-xl shadow-md">
            {step === 1 && <PrivateInfoForm onComplete={handlePrivateInfoComplete} />}
            {step === 2 && <SymptomsForm onComplete={handleSymptomsComplete} onBack={() => setStep(1)} />}
            {step === 3 && <Response privateInfo={privateInfo} symptoms={symptoms} />}
          </div>
        </div>
      </div>
    </div>
  )
}
