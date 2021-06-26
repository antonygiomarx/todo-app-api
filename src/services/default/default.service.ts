import { Injectable } from '@nestjs/common';

@Injectable()
export class DefaultService {
  default() {
    return 'Hola mundo!';
  }
}
