import { Module } from '@nestjs/common';
import { PasajerosModule } from './infrastructure/modules/pasajeros.module';
import { NotificationsModule } from './infrastructure/modules/notifications.module';

@Module({
  imports: [PasajerosModule, NotificationsModule],
})
export class AppModule {}
