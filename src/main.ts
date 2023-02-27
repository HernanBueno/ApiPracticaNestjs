import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
    })
  )
  const config = new DocumentBuilder()
  .setTitle('Pokedex API')
  .setDescription('Pokemon info API')
  .setVersion('1.0')
  .build();
  const document= SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT);
}
bootstrap();
