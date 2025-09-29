import { Controller, Get } from '@nestjs/common';

import { PasajerosService } from '../../services/pasajeros.service';

@Controller('pasajeros')
export class PasajerosController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  @Get()
  async findAll() {
    return this.pasajerosService.findAll();
  }
}