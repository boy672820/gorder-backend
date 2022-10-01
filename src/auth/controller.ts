import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Local } from '@core/common/decorators/auth';
import { User } from '@core/common/decorators/auth';
import type { LocalPayload } from '@libs/auth';
import { WebClient } from '@slack/web-api';

@Controller('auth')
export class AuthController {
  @Local()
  @Post()
  async _signIn(@User() user: LocalPayload) {
    return user;
  }

  @Get()
  async signIn(@Req() request) {
    const client = new WebClient();
    const response = await client.oauth.v2.access({
      client_id: '4160936562050.4146378227143',
      client_secret: 'secret',
      code: request.query.code,
    });

    const identity = await client.users.identity({
      token: response.authed_user.access_token,
    });

    console.log(identity);
  }
}
