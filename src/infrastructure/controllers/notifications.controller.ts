import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from '../../services/notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // Payload: { pasajero: {...}, amount: number }
  @Post('recharge-confirmation')
  async rechargeConfirmation(@Body() payload: any) {
    const { pasajero, amount } = payload;
    return this.notificationsService.sendRechargeConfirmation(pasajero, amount);
  }

  // Payload: { pasajero: {...}, balance: number }
  @Post('low-balance')
  async lowBalance(@Body() payload: any) {
    const { pasajero, balance } = payload;
    return this.notificationsService.sendLowBalanceAlert(pasajero, balance);
  }
}
