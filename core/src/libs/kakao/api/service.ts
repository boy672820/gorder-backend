import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { KakaoApiMe } from './types';

@Injectable()
export class KakaoApiService {
  constructor(private readonly http: HttpService) {}

  async me(token: string): Promise<KakaoApiMe> {
    const { data }: { data: KakaoApiMe } = await firstValueFrom(
      this.http.post(
        '/v2/user/me',
        {
          property_keys: ['kakao_account.', 'properties.', 'has_signed_up'],
        },
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    );

    return data;
  }
}
