import { Controller, Get } from '@nestjs/common';

@Controller('kakao-auth')
export class KakaoAuthController {
  @Get()
  authorize() {}
}
