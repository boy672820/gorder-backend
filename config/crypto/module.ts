import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import configuration from './configuration';
import { CryptoConfigService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CRYPTO_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  providers: [CryptoConfigService, ConfigService],
  exports: [CryptoConfigService, ConfigService],
})
export class CryptoConfigModule {}