# # Install dependencies and build the Next.js app
# FROM node:20-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci --frozen-lockfile

# COPY . .

# # Build the Next.js app
# RUN npm run build

# # Production image
# FROM node:20-alpine AS runner

# WORKDIR /app

# # Create non-root user
# RUN addgroup -g 1001 -S nodejs && \
#     adduser -u 1001 -S nodejs -G nodejs

# # Copy only necessary files from builder
# COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
# COPY --from=builder --chown=nodejs:nodejs /app/public ./public
# COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next
# COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=nodejs:nodejs /app/next.config.js ./next.config.js
# COPY --from=builder --chown=nodejs:nodejs /app/tsconfig.json ./tsconfig.json

# ENV NODE_ENV production
# EXPOSE 3000


# Development image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Install any needed global tools if required (optional)
# RUN npm install -g next

# Expose the development port
EXPOSE 3000


CMD ["npm", "run", "dev"]
