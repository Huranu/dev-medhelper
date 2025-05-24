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
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    terms: z.any().refine(val => val === true, {
        message: 'You must accept the terms',
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
            toast.success('Account created successfully')
            router.push('/')
        } catch (error: any) {
            toast.error(error?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Full Name</Label>
                <Input
                    placeholder="John Doe"
                    className="py-6"
                    {...register('fullName')}
                />
                {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Email</Label>
                <Input
                    placeholder="example@gmail.com"
                    className="py-6"
                    {...register('email')}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-sm text-gray-500">Password</Label>
                <Input
                    type="password"
                    placeholder="********"
                    className="py-6"
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
                                I agree to the <TermsDialog />
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

            <Button type="submit" className="py-6" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="flex items-center gap-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">or</span>
                <div className="flex-grow h-px bg-gray-300" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <GoogleLoginButton />
            </div>
        </form>
    )
}

export default RegisterForm
