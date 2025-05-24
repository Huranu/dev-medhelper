import { PrismaClient } from '@/app/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

// Type-safe global namespace extension
type GlobalPrisma = typeof globalThis & {
  _prisma?: PrismaClient;
};

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as GlobalPrisma;

// Initialize Prisma Client with Accelerate extension
const prisma: PrismaClient = globalForPrisma._prisma || 
  new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
    ],
    errorFormat: 'minimal',
  }).$extends(withAccelerate());

// Add event listeners for better debugging
prisma.$on('warn', (e) => {
  console.warn('Prisma Warning:', e);
});

prisma.$on('info', (e) => {
  console.log('Prisma Info:', e);
});

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e);
});

// Store in global only in non-production environment
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma._prisma = prisma;
}

// Export the extended client
export default prisma;