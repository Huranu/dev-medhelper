# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install OS dependencies
RUN apk add --no-cache libc6-compat openssl

# Copy dependencies
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm install
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Production Image
FROM node:20-alpine AS runner

# Set production environment
ENV NODE_ENV=production

WORKDIR /app

# Install OS dependencies again for runtime
RUN apk add --no-cache libc6-compat openssl

# Copy production build artifacts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/middleware.ts ./middleware.ts

# Expose port (Next.js default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
