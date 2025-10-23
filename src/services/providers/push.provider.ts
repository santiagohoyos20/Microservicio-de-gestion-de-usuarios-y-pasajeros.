import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PushProvider {
  private readonly logger = new Logger(PushProvider.name);

  /**
   * Send a push notification. This provider currently logs the payload.
   * Integrate FCM or Web Push here when ready.
   */
  async sendPush(deviceToken: string, title: string, body: string, data?: any): Promise<void> {
    if (!deviceToken) {
      this.logger.warn('No device token provided to sendPush');
      return;
    }

    // TODO: integrate with firebase-admin or web-push when needed
    this.logger.log(`sendPush to=${deviceToken} title=${title} body=${body} data=${JSON.stringify(data)}`);
  }
}
