import { PrismaClient } from '@prisma/client'

// Optional: only if using Prisma Accelerate
import { withAccelerate } from '@prisma/extension-accelerate'

// Global reuse (dev only) to prevent hot reload instantiation
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate()) // or without extension
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient().$extends(withAccelerate())
  }
  prisma = globalForPrisma.prisma
}

export default prisma
