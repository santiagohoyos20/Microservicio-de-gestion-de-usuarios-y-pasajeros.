import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class RecargasClientService {
  private readonly logger = new Logger(RecargasClientService.name);
  private readonly baseUrl = process.env.RECHARGES_SERVICE_URL;
  private readonly timeout = Number(process.env.RECHARGES_TIMEOUT_MS ?? 5000);
  private readonly useMock = process.env.RECHARGES_USE_MOCK === 'true' || !this.baseUrl;

  private mockData(userId: string, page = 1, limit = 20) {
    // Based on the recargas table structure: id_recarga, id_tarjeta, monto, metodo_pago, fecha_hora
    // We still accept userId to generate consistent mock entries (associating tarjetas to the user)
    const items = [
      {
        id_recarga: '1001',
        id_tarjeta: '5001',
        monto: 5000,
        metodo_pago: 'card',
        fecha_hora: new Date().toISOString(),
      },
      {
        id_recarga: '1002',
        id_tarjeta: '5002',
        monto: 1500,
        metodo_pago: 'cash',
        fecha_hora: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    // Paginate the mock items
    const paged = items.slice((page - 1) * limit, page * limit);
    return { data: paged, meta: { page, limit, total: items.length } };
  }

  async getHistoryByUser(userId: string, page = 1, limit = 20) {
    if (this.useMock) {
      this.logger.log('RECHARGES_SERVICE_URL not set or RECHARGES_USE_MOCK=true — using mock recargas data');
      return this.mockData(userId, page, limit);
    }

    const url = `${this.baseUrl}/recargas?userId=${encodeURIComponent(userId)}&page=${page}&limit=${limit}`;
    const headers: Record<string, string> = {};
    if (process.env.RECHARGES_API_KEY) headers['x-api-key'] = process.env.RECHARGES_API_KEY;

    try {
      const config: AxiosRequestConfig = { timeout: this.timeout, headers };
      const res = await axios.get(url, config);
      return res.data;
    } catch (err: any) {
      this.logger.error('Error fetching recargas from remote service; falling back to mock', err?.message ?? err);
      return this.mockData(userId, page, limit);
    }
  }
}
