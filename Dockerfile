# Stage 1: Build
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Install dependencies required to build Prisma client
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package files and Prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy full application source
COPY . .

# Build the Next.js app
RUN npm run build


# Stage 2: Production
FROM node:20-slim AS runner

WORKDIR /app

# Install minimal runtime dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/middleware.ts ./middleware.ts
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port Next.js will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
