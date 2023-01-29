import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { User, Public } from '@core/common/decorators/auth';
import type { JWTUserPayload } from '@core/authentication';
import { AuthService } from './service';
import { AuthSignInterceptor } from './interceptors';
import { SlackOAuthRedirectPipe } from './pipes';
//
import type { UsersIdentityResponse } from '@slack/web-api';
import { SlackAuthResult } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @UseInterceptors(AuthSignInterceptor)
  @Get()
  signIn(@Query('code', SlackOAuthRedirectPipe) result: SlackAuthResult) {
    return this.service.findOrCreate(result);
  }

  @Get('me')
  me(@User() user: JWTUserPayload): Promise<UsersIdentityResponse> {
    return this.service.getIdentity(user.accessToken);
  }
}
