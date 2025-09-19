import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasajerosModule } from './pasajeros/pasajeros.module';
import { ServicesService } from './application/services/services.service';
import { PasajerosService } from './application/services/pasajeros.service';

@Module({
  imports: [PasajerosModule],
  controllers: [AppController],
  providers: [AppService, ServicesService, PasajerosService],
})
export class AppModule {}
