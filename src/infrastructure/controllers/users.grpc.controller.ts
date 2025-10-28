import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PasajerosService } from '../../services/pasajeros.service';

@Controller()
export class UsersGrpcController {
  constructor(private readonly pasajerosService: PasajerosService) {}

  // El primer argumento es el package/service declarado en el proto: UsersService
  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: any): Promise<any> {
    // Mapear los campos del proto al modelo de prisma
    const { uuid, email, name, lastname, phone_number } = data || {};

    // El campo 'tarjeta' ahora es opcional en el modelo. No lo añadimos si
    // no viene en el request (el proto no lo incluye).
    const payload: any = {
      id_usuario: uuid || undefined,
      nombre: name ?? '',
      apellido: lastname ?? '',
      telefono: phone_number ?? '',
      email: email ?? '',
    };

    // Si en el futuro el proto incluye 'tarjeta', lo podemos asignar aquí.

    const created = await this.pasajerosService.create(payload);

    return {
      uuid: created.id_usuario,
      email: created.email,
      name: created.nombre,
      lastname: created.apellido,
      phone_number: created.telefono,
      message: 'created',
    };
  }
}
