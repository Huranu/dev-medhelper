'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleLoginButton from '../button/google-button'
import Link from 'next/link'
import { handwrittenLogin } from '../../_lib/queries'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const formSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    remember: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

const SignUpForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    })

    const onSubmit = async (data: FormData) => {
        console.log('Submitting...', data)
        setLoading(true)
        try {
            const user = await handwrittenLogin(data)
            console.log(user)
            toast.success('Login successful')
            router.push("/")
        } catch (err: any) {
            toast.error(err?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] sm:w-[400px] flex flex-col gap-6">
            <p className='text-center font-mono font-bold text-4xl mb-6 text-primary'>Бүртгүүлэх</p>
            <div className="flex flex-col gap-2">
                <Label className="text-sm font-normal text-gray-500">И-Мэйл</Label>
                <Input
                    className="py-6 rounded"
                    placeholder="example@gmail.com"
                    {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm font-normal text-gray-500">Нууц үг</Label>
                <Input
                    className="py-6 rounded"
                    type="password"
                    placeholder="********"
                    {...register('password')}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" {...register('remember')} />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                        Сануулах
                    </Label>
                </div>
                <Link href="/auth/forgot" className="text-sm text-primary hover:underline">
                    Нууц үгээ мартсан?
                </Link>
            </div>

            <Button
                type="submit"
                className="py-6 rounded-full"
                disabled={loading}
            >
                {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
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

export default SignUpForm