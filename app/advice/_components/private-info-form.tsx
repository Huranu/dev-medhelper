'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CirclePlus, Dumbbell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardPlus } from 'lucide-react';

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const Step1Schema = z.object({
    name: z.string().min(1, 'Нэр оруулна уу'),
    gender: z.enum(['male', 'female'], { required_error: 'Хүйс сонгоно уу' }),
    birthday: z.string().min(1, 'Төрсөн өдөр оруулна уу'),
    height: z.string().min(1, 'Өндөр оруулна уу'),
    weight: z.string().min(1, 'Жин оруулна уу'),
})

type Step1Values = z.infer<typeof Step1Schema>

const Step2Schema = z.object({
    smoking: z.string().min(1, 'Тамхи татдаг эсэхийг сонгоно уу'),
    pregnant: z.string().optional(),
    underlyingDiseases: z.array(z.string().min(1, 'Өвчин оруулна уу')).optional(),
    sedentary: z.string().min(1, 'Сууж ажилладаг эсэхийг сонгоно уу'),
    exercisePerWeek: z.string().min(1, 'Долоо хоногт хийдэг дасгалын тоог оруулна уу'),
})

type Step2Values = z.infer<typeof Step2Schema>

export default function PrivateInfoForm() {
    const [step, setStep] = useState(1)
    const [gender, setGender] = useState<'male' | 'female'>('male')
    const [diseaseInput, setDiseaseInput] = useState('')
    const [diseases, setDiseases] = useState<string[]>([])

    const formStep1 = useForm<Step1Values>({
        resolver: zodResolver(Step1Schema),
        defaultValues: {
            name: '',
            gender: 'male',
            birthday: '',
            height: '',
            weight: '',
        },
    })

    const formStep2 = useForm<Step2Values>({
        resolver: zodResolver(Step2Schema),
        defaultValues: {
            smoking: '',
            pregnant: '',
            underlyingDiseases: [],
            exercisePerWeek: '',
        },
    })

    const handleStep1Submit = (data: Step1Values) => {
        setGender(data.gender)
        setStep(2)
    }

    const handleFinalSubmit = (data: Step2Values) => {
        const finalData = {
            ...data,
            underlyingDiseases: diseases,
        }
        console.log('Step 1:', formStep1.getValues())
        console.log('Step 2:', finalData)
    }

    const addDisease = () => {
        if (diseaseInput.trim()) {
            setDiseases([...diseases, diseaseInput.trim()])
            setDiseaseInput('')
        }
    }

    const removeDisease = (index: number) => {
        setDiseases(diseases.filter((_, i) => i !== index))
    }

    return (
        <div className="w-full mx-auto mt-10 p-6 bg-white rounded-xl shadow min-h-[500px]">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex flex-row items-center text-2xl gap-2 text-blue-600  font-semibold mb-6"><ClipboardPlus strokeWidth={2}/>Хувийн мэдээлэл</div>
                        <Form {...formStep1}>
                            <form onSubmit={formStep1.handleSubmit(handleStep1Submit)} className="flex flex-col justify-end gap-4">
                                <FormField
                                    control={formStep1.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Таны нэр" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formStep1.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={(val) => { field.onChange(val); setGender(val as 'male' | 'female') }} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Хүйс сонгоно уу" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Эрэгтэй</SelectItem>
                                                    <SelectItem value="female">Эмэгтэй</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formStep1.control}
                                    name="birthday"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formStep1.control}
                                    name="height"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Өндөр (см)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formStep1.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder="Жин (кг)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                    Дараах
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex flex-row items-center gap-2 text-blue-600 text-2xl font-semibold mb-6"><Dumbbell size={25} strokeWidth={1.5}/>Амьдралын хэв маяг</div>
                        <Form {...formStep2}>
                            <form onSubmit={formStep2.handleSubmit(handleFinalSubmit)} className="space-y-4">
                                <FormField
                                    control={formStep2.control}
                                    name="smoking"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Та тамхи татдаг уу?</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Сонгоно уу" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1</SelectItem>
                                                        <SelectItem value="2">2</SelectItem>
                                                        <SelectItem value="no">Үгүй</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {gender === 'female' && (
                                    <FormField
                                        control={formStep2.control}
                                        name="pregnant"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Та жирэмсэн үү?</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Жирэмсэн эсэхийг сонгоно уу" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="yes">Тийм</SelectItem>
                                                            <SelectItem value="no">Үгүй</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <div>
                                    <FormLabel>Танд архаг хууч өвчин байгаа уу?</FormLabel>
                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            value={diseaseInput}
                                            onChange={(e) => setDiseaseInput(e.target.value)}
                                            placeholder="Ямар өвчинтэй вэ? Enter дарж нэмнэ үү"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    addDisease()
                                                }
                                            }}
                                        />
                                        <Button type="button" variant="ghost" className='cursor-pointer' onClick={addDisease}>
                                            <CirclePlus size={20} color="green" />
                                        </Button>
                                    </div>
                                    <ul className="flex flex-wrap gap-2 mt-3">
                                        {diseases.map((disease, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2 bg-gray-100 text-sm rounded-full px-3 py-1"
                                            >
                                                {disease}
                                                <button
                                                    type="button"
                                                    onClick={() => removeDisease(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <FormField
                                    control={formStep2.control}
                                    name="exercisePerWeek"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Долоо хоногт дасгал хийдэг удаа</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                    <Button type="button" onClick={() => setStep(1)} variant="outline" className='cursor-pointer'>
                                        Өмнөх
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                        Бүртгүүлэх
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
