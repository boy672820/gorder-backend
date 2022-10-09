import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { SlackOAuthRedirectParameterPipe } from '@core/common/pipes/slack';
import { User, Public } from '@core/common/decorators/auth';
import { AuthService } from './service';
import { AuthSignInterceptor } from './interceptors';
import type { JWTUserPayload } from '@core/authentication';
import type { UsersIdentityResponse } from '@slack/web-api';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @UseInterceptors(AuthSignInterceptor)
  @Get()
  signIn(@Query('code', new SlackOAuthRedirectParameterPipe()) code: string) {
    return this.service.findOrCreate(code);
  }

  @Get('me')
  me(@User() user: JWTUserPayload): Promise<UsersIdentityResponse> {
    return this.service.getIdentity(user.accessToken);
  }
}
