# Stage 1: Build
FROM node:20-slim AS builder

# Install build dependencies
RUN apt-get update && \
   apt-get install -y openssl build-essential python3 && \
   rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./
COPY prisma ./prisma

# Install all dependencies
RUN npm install --include=dev

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:20-slim

# Install runtime dependencies
RUN apt-get update && \
   apt-get install -y openssl && \
   rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Ensure Prisma engine is in all required locations
RUN cp -v ./node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node ./node_modules/.prisma/client/ && \
   cp -v ./node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node ./node_modules/@prisma/client/runtime/

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
   CMD curl -f http://localhost:3000/api/health || exit 1

EXPOSE 3000

# Use npm start to maintain consistency with your package.json
CMD ["npm", "start"]