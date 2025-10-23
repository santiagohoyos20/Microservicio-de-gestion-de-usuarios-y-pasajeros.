import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PasajerosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pasajero.findMany(); // trae todos los pasajeros
  }

  async findOne(id: string) {
    const pasajero = await this.prisma.pasajero.findUnique({
      where: { id_usuario: id },
    });
    if (!pasajero) throw new NotFoundException(`Pasajero ${id} no encontrado`);
    return pasajero;
  }

  async create(data: any) {
    // data should contain fields matching the pasajero model
    return this.prisma.pasajero.create({ data });
  }

  async update(id: string, data: any) {
    // Ensure exists
    await this.findOne(id);
    return this.prisma.pasajero.update({
      where: { id_usuario: id },
      data,
    });
  }

  async remove(id: string) {
    // Ensure exists
    await this.findOne(id);
    return this.prisma.pasajero.delete({ where: { id_usuario: id } });
  }
}