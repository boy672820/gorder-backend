import { Inject, Injectable } from '@nestjs/common';
import { SlackConfigService } from '@config';
import { WebClient } from '@slack/web-api';
import { AuthedUser } from '@slack/web-api/dist/response/OauthV2AccessResponse';

@Injectable()
export class SlackService {
  constructor(
    @Inject('WEB_CLIENT') private readonly webClient: WebClient,
    private readonly slackConfig: SlackConfigService,
  ) {}

  accessAuthedUser(code: string): Promise<AuthedUser> {
    return this.webClient.oauth.v2
      .access({
        client_id: this.slackConfig.clientId,
        client_secret: this.slackConfig.secret,
        code,
      })
      .then((response) => response.authed_user);
  }

  getIdentity(token: string) {
    return this.webClient.users.identity({ token });
  }
}
