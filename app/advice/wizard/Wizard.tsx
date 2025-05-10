'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"

export default function Wizard() {
  const [step, setStep] = useState(1)
  const [userInfo, setUserInfo] = useState({ name: "", age: "", gender: "" })
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [duration, setDuration] = useState(1)
  const [result, setResult] = useState("")

  const handleNext = () => {
    // if (step === 4) {
    //   const res = analyzeSymptoms(symptoms, duration)
    //   setResult(res)
    // }
    setStep((prev) => prev + 1)
  }

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="max-w-md mx-auto mt-10 p-6 space-y-6">
      {step === 1 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Step 1: Your Info</h2>
          <Input placeholder="Name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
          <Input type="number" placeholder="Age" onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} />
          <Input placeholder="Gender" onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })} />
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Step 2: Select Symptoms</h2>
          {["Fever", "Cough", "Headache", "Fatigue"].map((symptom) => (
            <Button
              key={symptom}
              variant={symptoms.includes(symptom) ? "default" : "outline"}
              onClick={() =>
                setSymptoms((prev) =>
                  prev.includes(symptom)
                    ? prev.filter((s) => s !== symptom)
                    : [...prev, symptom]
                )
              }
              className="w-full"
            >
              {symptom}
            </Button>
          ))}
        </Card>
      )}

      {step === 3 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Step 3: Duration</h2>
          <Slider defaultValue={[duration]} max={30} step={1} onValueChange={([val]) => setDuration(val)} />
          <p>{duration} days</p>
        </Card>
      )}

      {step === 4 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Result</h2>
          <p className="text-pink-600 font-medium">{result}</p>
        </Card>
      )}

      <div className="flex justify-between">
        {step > 1 && <Button onClick={handleBack} variant="outline">Back</Button>}
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : null}
      </div>
    </div>
  )
}
