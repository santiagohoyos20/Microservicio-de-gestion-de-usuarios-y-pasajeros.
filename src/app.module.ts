import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasajerosModule } from './pasajeros/pasajeros.module';

@Module({
  imports: [PasajerosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
