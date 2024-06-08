import { Module } from '@nestjs/common';
import { DolarApiService } from './dolar-api.service';
import { DolarApiController } from './dolar-api.controller';

@Module({
  controllers: [DolarApiController],
  providers: [DolarApiService],
})
export class DolarApiModule {}
