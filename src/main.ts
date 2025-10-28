import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar Swagger solo en entornos que no sean producción
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Microservicio Usuarios')
      .setDescription('API para gestión de usuarios y pasajeros')
      .setVersion('1.0')
      // .addBearerAuth() // Descomenta si usas JWT/Bearer
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  // Conectar microservicio gRPC
  const grpcOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../../proto/users.proto'),
      url: '0.0.0.0:50051',
    },
  };

  app.connectMicroservice(grpcOptions);
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
