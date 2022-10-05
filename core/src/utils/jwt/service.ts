import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CryptoService } from './crypto';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: _JwtService,
    private readonly crypto: CryptoService,
  ) {}

  verify<T = any>(jwt: string): T {
    const verified = this.jwtService.verify(jwt);
    const payload = this.crypto.decrypt(verified.sub);

    return JSON.parse(payload);
  }

  /**
   * JWT 생성
   *
   * 생성 시 암호화
   * @param payload 페이로드
   * @param options 옵션
   * @returns JWT
   */
  sign<T extends Record<string, string>>(
    sub: string,
    _claims: T,
    options?: JwtSignOptions,
  ): string {
    const claims: { [key: string]: string } = {};

    for (const key of Object.keys(_claims)) {
      claims[key] = this.crypto.encrypt(_claims[key]);
    }

    const payload = {
      sub: this.crypto.encrypt(sub),
      ...claims,
    };

    return this.jwtService.sign(payload, options);
  }
}
