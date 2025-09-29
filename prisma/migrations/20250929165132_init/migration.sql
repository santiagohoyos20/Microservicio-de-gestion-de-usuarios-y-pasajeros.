-- CreateTable
CREATE TABLE "public"."Pasajero" (
    "id_usuario" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tarjeta" TEXT NOT NULL,

    CONSTRAINT "Pasajero_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasajero_email_key" ON "public"."Pasajero"("email");
