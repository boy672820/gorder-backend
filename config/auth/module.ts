import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './service';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [AuthConfigService, ConfigService],
  exports: [AuthConfigService, ConfigService],
})
export class AuthConfigModule {}
