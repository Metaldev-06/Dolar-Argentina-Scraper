import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DolarApiModule } from './dolar-api/dolar-api.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DolarApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
