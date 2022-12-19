import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CryptoService } from '@utils/crypto';
import { AuthConfigService } from '@config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JWTUserPayload, JWTPayloadClaims } from '../types';
import { CoreAuthService } from '../service';

type JWTAuthPayload = JWTPayloadClaims & { sub: string };

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authConfig: AuthConfigService,
    private readonly service: CoreAuthService,
    private readonly crypto: CryptoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    });
  }

  async validate(payload: JWTAuthPayload): Promise<JWTUserPayload | null> {
    if (!payload.sub || !payload.userId) {
      return null;
    }

    // 토큰 유효성 검사(subject 검사)
    if (this.crypto.decrypt(payload.sub) !== 'access') {
      return null;
    }

    // ---------------------------------------------------------------------

    const userId = BigInt(this.crypto.decrypt(payload.userId));

    const auth = await this.service.authentication({ userId });

    return auth;
  }
}
