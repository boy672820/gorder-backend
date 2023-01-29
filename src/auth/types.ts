import type { UsersIdentityResponse } from '@slack/web-api';

export type SlackAuthResult = {
  identity: UsersIdentityResponse;
  accessToken: string;
  refreshToken: string;
};
