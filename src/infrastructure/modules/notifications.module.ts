import { Module } from '@nestjs/common';
import { NotificationsController } from '../controllers/notifications.controller';
import { NotificationsService } from '../../services/notifications.service';
import { EmailProvider } from '../../services/providers/email.provider';
import { PushProvider } from '../../services/providers/push.provider';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, EmailProvider, PushProvider],
  exports: [NotificationsService],
})
export class NotificationsModule {}
