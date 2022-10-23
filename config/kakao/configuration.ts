import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  restKey: process.env.KAKAO_REST_KEY,
  oauthUrl: process.env.KAKAO_OAUTH_URL,
  apiUrl: process.env.KAKAO_API_URL,
  // redirectUrl: process.env.KAKAO_REDIRECT_URI,
  redirectUrl: 'https://dirty-keys-yawn-220-90-92-188.loca.lt',
}));
