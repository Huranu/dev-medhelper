'use server'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { signIn } from "@/app/auth"
import { AuthError } from "next-auth"

export async function handwrittenLogin(data: { email: string; password: string }) {
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (result?.error) {
            throw new Error('Invalid email or password')
        }

        return { success: true }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    throw new Error('Invalid email or password')
                default:
                    throw new Error('Authentication failed')
            }
        }
        throw error
    }
}

export async function signUp(data: { fullName: string; email: string; password: string }) {
    const { fullName, email, password } = data

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new Error('Email already in use')
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            name: fullName,
            email,
            accounts: {
                create: {
                    type: 'credentials',
                    provider: 'credentials',
                    providerAccountId: email,
                    access_token: hashedPassword,
                },
            },
        },
    })

    return newUser
}