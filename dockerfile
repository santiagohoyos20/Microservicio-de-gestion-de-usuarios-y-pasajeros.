# Etapa de build
FROM node:20 AS builder
WORKDIR /usr/src/app

# Copiar package.json y lockfile primero
COPY package*.json ./

# Instalar dependencias usando npm ci
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# Compilar el proyecto (si es NestJS con TypeScript)
RUN npm run build

# Etapa final (imagen más liviana)
FROM node:20-slim AS production
WORKDIR /usr/src/app

# Copiar dependencias ya instaladas
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar el código compilado
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]
