import { Module } from '@nestjs/common';
import { PasajerosController } from '../controllers/pasajeros.controller';
import { PasajerosService } from '../../services/pasajeros.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RecargasClientService } from '../../services/recargas.client.service';

@Module({
  imports: [PrismaModule],         // <-- Importamos Prisma
  controllers: [PasajerosController],
  providers: [PasajerosService, RecargasClientService],   // <-- Registramos el servicio y el cliente de recargas
  exports: [RecargasClientService],
})
export class PasajerosModule {}
