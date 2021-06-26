import { ConfigService } from '@config/config.service';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(
    app,
    ConfigService.swaggerConfig,
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
