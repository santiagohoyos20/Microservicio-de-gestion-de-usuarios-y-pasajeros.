import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailProvider {
  private readonly logger = new Logger(EmailProvider.name);

  /**
   * Send an email. This is a minimal provider: if SMTP env vars are present
   * it will try to use nodemailer (if installed). Otherwise it falls back to logging.
   */
  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    if (!to) {
      this.logger.warn('No recipient provided for sendEmail');
      return;
    }

    const smtpHost = process.env.SMTP_HOST;
    if (smtpHost) {
      try {
        // Try to load nodemailer dynamically. If not installed, fallback to log.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            : undefined,
        });
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com',
          to,
          subject,
          text: text ?? '',
          html,
        });
        this.logger.log(`Email enviado a ${to} vía SMTP`);
        return;
      } catch (err) {
        this.logger.warn('No se pudo usar nodemailer o falló el envío, usando fallback (log)', err as any);
      }
    }

    // Fallback: just log the message
    this.logger.log(`sendEmail to=${to} subject=${subject} html=${html}`);
  }
}
