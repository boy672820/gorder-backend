import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidCredentialsException } from '@core/common/errors/auth';
import { AuthService } from '../service';

@Injectable()
export class SlackOAuthRedirectPipe implements PipeTransform {
  constructor(private readonly service: AuthService) {}

  async transform(value: any) {
    if (!value) {
      throw new InvalidCredentialsException();
    }

    try {
      // Slack OAuth & get tokens
      const result = await this.service.getTokenAndIdentity(value);

      return result;
    } catch (_) {
      throw new InvalidCredentialsException();
    }
  }
}
