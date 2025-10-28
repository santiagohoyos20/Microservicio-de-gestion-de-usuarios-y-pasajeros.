import { Module } from '@nestjs/common';
import { PasajerosController } from '../controllers/pasajeros.controller';
import { PasajerosService } from '../../services/pasajeros.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RecargasClientService } from '../../services/recargas.client.service';
import { UsersGrpcController } from '../controllers/users.grpc.controller';

@Module({
  imports: [PrismaModule],         // <-- Importamos Prisma
  controllers: [PasajerosController, UsersGrpcController],
  providers: [PasajerosService, RecargasClientService],   // <-- Registramos el servicio y el cliente de recargas
  exports: [RecargasClientService],
})
export class PasajerosModule {}
