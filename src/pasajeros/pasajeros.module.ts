import { Module } from '@nestjs/common';
import { PasajerosController } from './pasajeros.controller';

@Module({
  controllers: [PasajerosController]
})
export class PasajerosModule {}
