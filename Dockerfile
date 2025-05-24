# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install required system dependencies
RUN apk add --no-cache libc6-compat openssl

# Copy dependency files first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Install runtime OS dependencies
RUN apk add --no-cache libc6-compat openssl

# Copy needed files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/middleware.ts ./middleware.ts

# Copy prisma client engine (important for Alpine)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Default port for Next.js
EXPOSE 3000

# Start app with Next.js built-in server
CMD ["npm", "start"]
