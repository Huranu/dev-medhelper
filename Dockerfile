# Stage 1: Base
FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install -y openssl ca-certificates
WORKDIR /app
COPY package.json package-lock.json ./

# Stage 2: Build
FROM base AS build
RUN npm install --include=dev
COPY . .
RUN npx prisma generate

# Critical Fix: Copy engine to ALL required locations
RUN mkdir -p node_modules/.prisma/client && \
   cp node_modules/prisma/libquery_engine-debian-openssl-1.1.x.so.node node_modules/.prisma/client/ && \
   cp node_modules/prisma/libquery_engine-debian-openssl-1.1.x.so.node node_modules/@prisma/client/runtime/ && \
   mkdir -p .next/standalone/node_modules/.prisma/client && \
   cp node_modules/prisma/libquery_engine-debian-openssl-1.1.x.so.node .next/standalone/node_modules/.prisma/client/

RUN npm run build

# Stage 3: Production
FROM base
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma

# Final verification
RUN ls -la node_modules/.prisma/client/ && \
   ls -la node_modules/@prisma/client/runtime/

EXPOSE 3000
CMD ["npm", "start"]