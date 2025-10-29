### Builder
FROM node:20 AS builder
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source files needed for build
COPY prisma ./prisma
COPY src ./src
COPY proto ./proto
COPY tsconfig*.json ./

# Generate Prisma client and build
RUN npx prisma generate
RUN npm run build

### Runner
FROM node:20-slim
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy built artifacts and node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/proto ./proto

# Entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000 50051

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
