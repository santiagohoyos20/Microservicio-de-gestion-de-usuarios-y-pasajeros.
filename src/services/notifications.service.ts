import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider } from './providers/email.provider';
import { PushProvider } from './providers/push.provider';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly pushProvider: PushProvider,
  ) {}

  async sendRechargeConfirmation(pasajero: any, amount: number) {
    const subject = 'Recarga confirmada';
    const body = `<p>Hola ${pasajero?.nombre ?? 'usuario'}, hemos recibido tu recarga de ${amount}.</p>`;
    try {
      await this.emailProvider.sendEmail(pasajero?.email, subject, body);
      if (pasajero?.deviceToken) {
        await this.pushProvider.sendPush(pasajero.deviceToken, subject, `Recarga de ${amount} recibida`);
      }
    } catch (err) {
      this.logger.warn('Error enviando notificación de recarga', err as any);
    }
  }

  async sendLowBalanceAlert(pasajero: any, balance: number) {
    const subject = 'Saldo bajo';
    const body = `<p>Hola ${pasajero?.nombre ?? 'usuario'}, tu saldo es ${balance}. Por favor recarga.</p>`;
    try {
      await this.emailProvider.sendEmail(pasajero?.email, subject, body);
      if (pasajero?.deviceToken) {
        await this.pushProvider.sendPush(pasajero.deviceToken, subject, `Saldo: ${balance}`);
      }
    } catch (err) {
      this.logger.warn('Error enviando notificación de saldo bajo', err as any);
    }
  }
}
