import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { KakaoConfigService } from '@config';
import { firstValueFrom } from 'rxjs';
import { KakaoOAuthToken } from './types';

@Injectable()
export class KakaoOAuthService {
  constructor(
    private readonly http: HttpService,
    private readonly kakaoConfig: KakaoConfigService,
  ) {}

  async token(code: string): Promise<KakaoOAuthToken> {
    const { data }: { data: KakaoOAuthToken } = await firstValueFrom(
      this.http.post('/oauth/token', {
        grant_type: 'authorization_code',
        redirectUri: this.kakaoConfig.redirectUrl,
        code,
      }),
    );

    return data;
  }
}
