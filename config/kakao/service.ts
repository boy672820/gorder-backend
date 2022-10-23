import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `kakao.${key}`;

@Injectable()
export class KakaoConfigService {
  constructor(private readonly configService: ConfigService) {}

  get restKey(): string {
    return this.configService.get<string>(prefix('restKey'));
  }

  get oauthUrl(): string {
    return this.configService.get<string>(prefix('oauthUrl'));
  }

  get apiUrl(): string {
    return this.configService.get<string>(prefix('apiUrl'));
  }

  get redirectUrl(): string {
    return this.configService.get<string>(prefix('redirectUrl'));
  }
}
