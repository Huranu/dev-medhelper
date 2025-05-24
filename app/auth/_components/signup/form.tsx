'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleLoginButton from '../button/google-button'
import TermsDialog from './terms-modal'
import { signUp } from '../../_lib/queries'

const formSchema = z.object({
    fullName: z.string().min(2, 'Бүтэн нэр оруулах шаардлагатай'),
    email: z.string().email('Буруу имэйл хаяг'),
    password: z.string().min(6, 'Нууц үг дор хаяж 8 тэмдэгттэй байх ёстой'),
    terms: z.any().refine(val => val === true, {
        message: 'Та нөхцөлийг зөвшөөрөх ёстой',
    }),
})

type FormData = z.infer<typeof formSchema>

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        try {
            const res = await signUp(data)
            console.log(res)
            toast.success('Бүртгэл амжилттай үүслээ')
            router.push('/')
        } catch (error: any) {
            toast.error(error?.message || 'Алдаа гарлаа')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] sm:w-[400px] flex flex-col gap-6">
            <p className='text-center font-mono font-bold text-primary text-4xl mb-6'>Бүртгүүлэх</p>
            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Овог нэр</Label>
                <Input
                    placeholder="John Doe"
                    className="py-6 rounded"
                    {...register('fullName')}
                />
                {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">И-Мэйл</Label>
                <Input
                    placeholder="example@gmail.com"
                    className="py-6 rounded"
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Нууц үг</Label>
                <Input
                    type="password"
                    placeholder="********"
                    className="py-6 rounded"
                    {...register('password')}
                />
                {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="terms" className="text-sm cursor-pointer">
                                Би зөвшөөрч байна <TermsDialog />
                            </Label>
                        </div>
                    )}
                />
            </div>
            {errors.terms && (
                <p className="text-sm text-red-500">
                    {errors.terms.message as string}
                </p>
            )}

            <Button type="submit" className="py-6 rounded-full" disabled={loading}>
                {loading ? 'Үүсгэж байна...' : 'Бүртгэл үүсгэх'}
            </Button>

            <div className="flex items-center gap-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">эсвэл</span>
                <div className="flex-grow h-px bg-gray-300" />
            </div>

            <GoogleLoginButton />
        </form>
    )
}

export default RegisterForm
