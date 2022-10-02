import { Controller, Get, Query } from '@nestjs/common';
import { SlackOAuthRedirectParameterPipe } from '@core/common/pipes/slack';
import { AuthService } from './service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  signIn(@Query('code', new SlackOAuthRedirectParameterPipe()) code: string) {
    return this.service.getIdentify(code);
  }
}
