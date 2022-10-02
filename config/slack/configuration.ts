import { registerAs } from '@nestjs/config';

export default registerAs('slack', () => ({
  clientId: process.env.SLACK_CLIENT_ID,
  secret: process.env.SLACK_SECRET,
}));
