'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

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

// Step 1 schema
const stepOneSchema = z.object({
    name: z.string().min(1, 'Нэр оруулна уу'),
    gender: z.enum(['male', 'female'], {
        required_error: 'Хүйс сонгоно уу',
    }),
    birthday: z.string().min(1, 'Төрсөн өдөр оруулна уу'),
})

type StepOneValues = z.infer<typeof stepOneSchema>

export default function PrivateInfoForm() {
    const [step, setStep] = useState(1)

    const form = useForm<StepOneValues>({
        resolver: zodResolver(stepOneSchema),
        defaultValues: {
            name: '',
            gender: '',
            birthday: '',
        },
    })

    const onSubmitStepOne = (data: StepOneValues) => {
        console.log('✅ Step 1 done:', data)
        setStep(2)
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-2xl font-semibold mb-6">
                {step === 1 ? 'Хувийн мэдээлэл оруулах' : 'Амьдралын хэв маягаа оруулах'}
            </div>

            {step === 1 && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitStepOne)} className="space-y-4">
                        {/* Name */}
                        <FormField
                            control={form.control}
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

                        {/* Gender */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Хүйсээ сонгоно уу" />
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

                        {/* Birthday */}
                        <FormField
                            control={form.control}
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

                        <Button
                            type="submit"
                            className="rounded-sm bg-purple-600 hover:bg-purple-700 px-14 py-5 mt-7"
                        >
                            Дараах
                        </Button>
                    </form>
                </Form>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <p className="text-lg">🎉 Та хувийн мэдээллээ амжилттай орууллаа!</p>
                    {/* Add your next form fields here */}
                    <Button onClick={() => setStep(1)} variant="outline">
                        Буцах
                    </Button>
                </div>
            )}
        </div>
    )
}
