import { Module } from '@nestjs/common';
import { PasajerosModule } from './infrastructure/modules/pasajeros.module';

@Module({
  imports: [PasajerosModule], // Solo importa tu módulo de pasajeros
})
export class AppModule {}
