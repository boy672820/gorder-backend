import { Injectable } from '@nestjs/common';
import { KakaoOAuthService } from '@libs/kakao';

@Injectable()
export class KakaoService {
  constructor(private readonly kakaoOAuth: KakaoOAuthService) {}

  /**
   * 카카오 로그인 후 사용자 정보 조회
   * @param code 카카오 인가코드
   * @returns KakaoMe
   */
  async authorize(code: string): Promise<string> {
    const { access_token } = await this.kakaoOAuth.token(code);

    return access_token;
  }
}
