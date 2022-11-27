import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //esto permite convetir los dto en la data que quiero recibir
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  app.setGlobalPrefix('api/v2');

  await app.listen(3000);
}
bootstrap();
