import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { User, Public } from '@core/common/decorators/auth';
import type { JWTUserPayload } from '@core/authentication';
import { AuthService } from './service';
import { AuthSignInterceptor } from './interceptors';
import { SlackOAuthRedirectPipe } from './pipes';
//
import type { UsersIdentityResponse } from '@slack/web-api';
import { SlackAuthResult } from './types';
import { ApiQuery } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @UseInterceptors(AuthSignInterceptor)
  @ApiQuery({ name: 'code' })
  @Get()
  signIn(@Query('code', SlackOAuthRedirectPipe) result: SlackAuthResult) {
    return this.service.findOrCreate(result);
  }

  @Get('me')
  async me(@User() { userId }: JWTUserPayload) {
    const user = await this.service.user({ where: { userId } });

    delete user.userId;
    return user;
  }

  @Get('identity')
  identity(@User() user: JWTUserPayload): Promise<UsersIdentityResponse> {
    return this.service.getIdentity(user.accessToken);
  }
}
