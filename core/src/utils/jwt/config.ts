import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { AuthConfigService } from '@config/auth';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly jwtConfig: AuthConfigService) {
    const secret = this.jwtConfig.secret;
    const expiration = this.jwtConfig.expiration;

    this.secret = secret;
    this.expiration = expiration;
  }

  private readonly secret: string;
  private readonly expiration: string;

  createJwtOptions() {
    return {
      secret: this.secret,
      verifyOptions: { maxAge: this.expiration },
    };
  }
}
