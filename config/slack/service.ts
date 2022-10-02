import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `slack.${key}`;

@Injectable()
export class SlackConfigService {
  constructor(private readonly configService: ConfigService) {}

  get clientId(): string {
    return this.configService.get<string>(prefix('clientId'));
  }

  get secret(): string {
    return this.configService.get<string>(prefix('secret'));
  }
}
