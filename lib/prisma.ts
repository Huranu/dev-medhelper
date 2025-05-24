import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// 1. First create the extended client type
type AcceleratedClient = ReturnType<typeof withAccelerate>

// 2. Define global type
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// 3. Initialize client
const prisma = globalForPrisma.prisma || 
  new PrismaClient().$extends(withAccelerate())

// 4. Type assertion for the extended client
const acceleratedPrisma = prisma as unknown as PrismaClient & AcceleratedClient

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default acceleratedPrisma