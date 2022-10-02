import { Inject, Injectable } from '@nestjs/common';
import { SlackConfigService } from '@config';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  constructor(
    @Inject('WEB_CLIENT') private readonly webClient: WebClient,
    private readonly slackConfig: SlackConfigService,
  ) {}

  private getAccessToken(code: string) {
    return this.webClient.oauth.v2
      .access({
        client_id: this.slackConfig.clientId,
        client_secret: this.slackConfig.secret,
        code,
      })
      .then((response) => response.authed_user.access_token);
  }

  async getIdentity(code: string) {
    const token = await this.getAccessToken(code);

    return this.webClient.users.identity({ token });
  }
}
