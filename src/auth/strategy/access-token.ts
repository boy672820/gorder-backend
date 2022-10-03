import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { SLACK_ACCESS_TOKEN } from '../constants';
import { AuthService } from '../service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  SLACK_ACCESS_TOKEN,
) {
  constructor(private readonly service: AuthService) {
    super();
  }

  validate(payload: string): Promise<any> {
    return this.service.getIdentity(payload);
  }
}
