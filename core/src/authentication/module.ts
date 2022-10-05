import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CryptoModule } from '@utils/crypto';
import { AuthConfigModule } from '@config';
import { AuthJwtGuard } from './guards/jwt';
import { AuthJwtStrategy } from './strategy/jwt';
import { CoreAuthService } from './service';

@Module({
  imports: [AuthConfigModule, CryptoModule],
  providers: [
    CoreAuthService,
    AuthJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
  ],
})
export class CoreAuthModule {}
