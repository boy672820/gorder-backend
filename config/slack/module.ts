import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { SlackConfigService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, SlackConfigService],
  exports: [ConfigService, SlackConfigService],
})
export class SlackConfigModule {}
