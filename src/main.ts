import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname ,"../uploads"))
  const config = new DocumentBuilder()
    .setTitle('Set In Love')
    .setDescription('API SetInLove developed by Milo')
    .setVersion('1.0')  
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000,'192.168.1.17');
}
bootstrap();
