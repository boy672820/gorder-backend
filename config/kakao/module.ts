import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KakaoConfigService } from './service';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [KakaoConfigService, ConfigService],
  exports: [KakaoConfigService, ConfigService],
})
export class KakaoConfigModule {}
