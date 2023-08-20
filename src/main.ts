import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true, origin: true });

  const config = new DocumentBuilder()
    .setTitle('Webpractik Pizza - OpenAPI 3.0')
    .setDescription(
      `[The source API definition (json)](http://${process.env.SERVER}:${process.env.PORT}/api-json)`,
    )
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT);
  const server = process.env.SERVER;
  await app.listen(port, server);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
