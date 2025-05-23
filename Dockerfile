FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --frozen-lockfile

COPY . .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
   adduser -u 1001 -S nodejs -G nodejs

COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/.next ./.next
# COPY --from=builder --chown=nodejs:nodejs /app/public ./public || true

RUN npm ci --omit=dev --frozen-lockfile --no-audit

ENV NODE_ENV production

EXPOSE 3000

USER nodejs

CMD ["npm", "start"]