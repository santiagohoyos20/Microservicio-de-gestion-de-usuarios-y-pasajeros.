# -------- Etapa 1: Builder --------
FROM node:20 AS builder

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Generamos cliente de Prisma
RUN npx prisma generate

# Compilamos NestJS
RUN npm run build


# -------- Etapa 2: Runner --------
FROM node:20

WORKDIR /usr/src/app

# Copiamos solo lo necesario desde el builder
COPY --from=builder /usr/src/app ./

# Puerto donde corre NestJS
EXPOSE 3000

# Comando de inicio en producción
CMD ["npm", "run", "start:prod"]
