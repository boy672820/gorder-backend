import { Injectable } from '@nestjs/common';
import { SlackService } from '@providers/slack';

@Injectable()
export class AuthService {
  constructor(private readonly slack: SlackService) {}

  async signIn(code: string) {
    const user = await this.slack.accessAuthedUser(code);

    return this.slack.getIdentity(user.access_token);
  }

  getIdentity(token: string) {
    return this.slack.getIdentity(token);
  }
}
