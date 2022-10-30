import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public, User } from '../../common/decorators/auth';
import { KakaoAccessTokenGuard } from './guards';

@Controller('kakao')
export class KakaoController {
  @Public()
  @UseGuards(KakaoAccessTokenGuard)
  @Get('authorize')
  authorize(@User() user) {}
}
