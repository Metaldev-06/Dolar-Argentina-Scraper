import { Controller, Get, Param } from '@nestjs/common';
import { DolarApiService } from './dolar-api.service';

@Controller('')
export class DolarApiController {
  constructor(private readonly dolarApiService: DolarApiService) {}

  @Get()
  findAll() {
    return this.dolarApiService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.dolarApiService.findOne(name);
  }

  @Get(':name/value')
  findOneValue(@Param('name') name: string) {
    return this.dolarApiService.findOneValue(name);
  }
}
