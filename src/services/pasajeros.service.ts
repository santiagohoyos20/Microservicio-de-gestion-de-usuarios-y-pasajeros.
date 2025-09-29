import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PasajerosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pasajero.findMany(); // trae todos los pasajeros
  }
}