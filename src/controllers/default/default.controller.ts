import { Controller, Get } from '@nestjs/common';
import { DefaultService } from '@services/default/default.service';

@Controller('/')
export class DefaultController {
  constructor(private readonly _defaultService: DefaultService) {}

  @Get()
  default() {
    return this._defaultService.default();
  }
}
