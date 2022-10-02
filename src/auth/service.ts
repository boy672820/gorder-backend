import { Injectable } from '@nestjs/common';
import { SlackService } from '@providers/slack';

@Injectable()
export class AuthService {
  constructor(private readonly slack: SlackService) {}

  getIdentify(code: string) {
    return this.slack.getIdentity(code);
  }
}
