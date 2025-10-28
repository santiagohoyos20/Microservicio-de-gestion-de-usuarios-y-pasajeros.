/*
  Warnings:

  - You are about to drop the `Pasajero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Pasajero";

-- CreateTable
CREATE TABLE "pasajero" (
    "id_usuario" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tarjeta" TEXT NOT NULL,

    CONSTRAINT "Pasajero_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasajero_email_key" ON "pasajero"("email");
