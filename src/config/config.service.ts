import { DocumentBuilder } from '@nestjs/swagger';

import { config } from 'dotenv';

config();

export class ConfigService {
  static swaggerConfig = new DocumentBuilder()
    .setTitle('TODOS App')
    .setDescription('TODOS App description')
    .setVersion('1.0')
    .addTag('TODO')
    .build();
}
