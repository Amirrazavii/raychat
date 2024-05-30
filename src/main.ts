import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './share/catch/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('RYCHAT')
  .setDescription('rychat api documentation')
  .setVersion('1.0')
  .addTag('rychat')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   //Add your origins here
  //   origin: '*'
  // });
  await app.listen(port);
}
bootstrap();
