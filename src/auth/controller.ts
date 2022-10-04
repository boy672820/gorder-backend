import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SlackOAuthRedirectParameterPipe } from '@core/common/pipes/slack';
import { User } from '@core/common/decorators/auth';
import { AuthService } from './service';
import { AccessTokenGuard } from './guards/access-token';
import { UserPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  signIn(@Query('code', new SlackOAuthRedirectParameterPipe()) code: string) {
    return this.service.findOrCreate(code);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  me(@User() user: UserPayload) {
    return user;
  }
}
