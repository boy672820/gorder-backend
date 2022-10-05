import { Module } from '@nestjs/common';
import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { AuthConfigModule, CryptoConfigModule } from '@config';
import { JwtConfigService } from './config';
import { JwtService } from './service';
import { CryptoService } from './crypto';
import { key } from './key';

@Module({
  imports: [
    CryptoConfigModule,
    _JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useClass: JwtConfigService,
    }),
  ],
  providers: [JwtService, CryptoService, key],
  exports: [JwtService],
})
export class JwtModule {}
