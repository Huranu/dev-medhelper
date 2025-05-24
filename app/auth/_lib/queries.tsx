'use server'
import prisma from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'

export async function handwrittenLogin(data: { email: string; password: string }) {
    const { email, password } = data

    const account = await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider: 'credentials',
                providerAccountId: email,
            },
        },
        include: {
            user: true,
        },
    })

    if (!account || !account.access_token) {
        throw new Error('Invalid email or password')
    }

    const passwordMatch = await compare(password, account.access_token)

    if (!passwordMatch) {
        throw new Error('Invalid email or password')
    }

    return account.user
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