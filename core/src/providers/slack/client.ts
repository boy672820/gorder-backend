import { WebClient } from '@slack/web-api';

export const webClient = {
  provide: 'WEB_CLIENT',
  useFactory: () => {
    return new WebClient();
  },
};
