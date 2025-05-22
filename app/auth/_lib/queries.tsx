'use server'
import prisma from '@/lib/prisma'
import { compare } from 'bcryptjs'

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
