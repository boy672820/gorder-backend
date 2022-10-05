import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  expiration: process.env.JWT_EXPIRATION_TIME,
  secret: process.env.JWT_SECRET,
}));
