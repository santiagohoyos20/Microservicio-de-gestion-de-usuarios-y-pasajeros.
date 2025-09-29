import { Module } from '@nestjs/common';
import { PasajerosController } from '../controllers/pasajeros.controller';
import { PasajerosService } from '../../services/pasajeros.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],         // <-- Importamos Prisma
  controllers: [PasajerosController],
  providers: [PasajerosService],   // <-- Registramos el servicio
})
export class PasajerosModule {}
