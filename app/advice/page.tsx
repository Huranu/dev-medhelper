'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import PrivateInfoForm from './_components/private-info-form'

export default function WizardPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const progress = step === 1 ? 0 : step === 2 ? 50 : 100

  return (
    <div className="flex flex-row justify-center items-center w-full mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Progress Bar */}
      <div className="flex flex-col items-center">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border ${step === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-500 border-gray-300'
                }`}
            >
              {s}
            </div>

            {/* Connector Line */}
            {i < totalSteps - 1 && (
              <div className="w-px h-52 bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className='flex flex-col items-center ml-10'>
        <div className="p-6 w-2xl h-128 flex flex-col justify-center">
          {step === 1 && <PrivateInfoForm />}
          {step === 2 && <div>Step 2: (Add content)</div>}
          {step === 3 && <div>Step 3: (Add content)</div>}
          <div className="flex space-x-4 mt-4">
            <Button onClick={() => setStep((prev) => Math.max(prev - 1, 1))} variant="outline" disabled={step === 1}>
              Back
            </Button>
            <Button onClick={() => setStep((prev) => Math.min(prev + 1, totalSteps))} disabled={step === totalSteps}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
