import NextAuth from "next-auth";
import { PrismaClient } from '@/app/prisma'
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const account = await prisma.account.findUnique({
                        where: {
                            provider_providerAccountId: {
                                provider: 'credentials',
                                providerAccountId: credentials.email as string,
                            },
                        },
                        include: {
                            user: true,
                        },
                    })

                    if (!account || !account.access_token) {
                        return null
                    }

                    const passwordMatch = await compare(
                        credentials.password as string, 
                        account.access_token
                    )

                    if (!passwordMatch) {
                        return null
                    }

                    return {
                        id: account.user.id,
                        email: account.user.email,
                        name: account.user.name,
                        image: account.user.image,
                    }
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: "/auth",
    },
})