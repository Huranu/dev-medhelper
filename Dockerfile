# Stage 1: Build
FROM node:20-slim AS builder

# Install build dependencies (including Python for some node-gyp packages)
RUN apt-get update && \
   apt-get install -y openssl build-essential python3 && \
   rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies including devDependencies (needed for Prisma)
RUN npm install --include=dev

# Generate Prisma client and ensure engine files are in place
RUN npx prisma generate && \
   mkdir -p node_modules/.prisma/client && \
   cp node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node node_modules/.prisma/client/ && \
   cp node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node node_modules/@prisma/client/runtime/

# Copy application source
COPY . .

# Build Next.js application
RUN npm run build

# Create optimized production structure
RUN mkdir -p .next/standalone/node_modules/.prisma/client && \
   cp node_modules/prisma/libquery_engine-debian-openssl-3.0.x.so.node .next/standalone/node_modules/.prisma/client/

# Stage 2: Production
FROM node:20-slim

# Install runtime dependencies
RUN apt-get update && \
   apt-get install -y openssl && \
   rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy production assets from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Verify and ensure Prisma engine is accessible
RUN ls -la node_modules/.prisma/client/ && \
   ls -la node_modules/@prisma/client/runtime/

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1


EXPOSE 3000

# Use npm start to respect package.json scripts
CMD ["npm", "start"]