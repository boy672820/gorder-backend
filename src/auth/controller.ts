import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SlackOAuthRedirectParameterPipe } from '@core/common/pipes/slack';
import { User } from '@core/common/decorators/auth';
import { AuthService } from './service';
import { AccessTokenGuard } from './guards/access-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  signIn(@Query('code', new SlackOAuthRedirectParameterPipe()) code: string) {
    return this.service.signIn(code);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  me(@User() user: any) {
    return user;
    // return this.service.getIdentity(data.token);
  }
}
