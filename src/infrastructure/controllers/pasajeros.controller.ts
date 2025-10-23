import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { PasajerosService } from '../../services/pasajeros.service';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Get()
  async findAll() {
    return this.pasajerosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pasajerosService.findOne(id);
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