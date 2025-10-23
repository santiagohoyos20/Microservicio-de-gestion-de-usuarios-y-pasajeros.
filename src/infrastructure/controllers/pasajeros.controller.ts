import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { PasajerosService } from '../../services/pasajeros.service';
import { RecargasClientService } from '../../services/recargas.client.service';

@Controller('pasajeros')
export class PasajerosController {
  constructor(
    private readonly pasajerosService: PasajerosService,
    private readonly recargasClient: RecargasClientService,
  ) {}

  @Get()
  async findAll() {
    return this.pasajerosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pasajerosService.findOne(id);
  }

  @Get(':id/recargas')
  async getRecargas(@Param('id') id: string, @Query('page') page?: number, @Query('limit') limit?: number) {
    const pg = Number(page ?? 1);
    const lm = Number(limit ?? 20);
    return this.recargasClient.getHistoryByUser(id, pg, lm);
  }

  @Post()
  async create(@Body() data: any) {
    return this.pasajerosService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.pasajerosService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pasajerosService.remove(id);
  }
}