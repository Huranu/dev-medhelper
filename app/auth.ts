import NextAuth from "next-auth";
import { PrismaClient } from '@/app/prisma'
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

const prisma = new PrismaClient()
export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
    ],
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
})