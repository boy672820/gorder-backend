import { Module } from '@nestjs/common';
import { SlackConfigModule } from '@config';
import { webClient } from './client';
import { SlackService } from './service';

@Module({
  imports: [SlackConfigModule],
  providers: [SlackService, webClient],
  exports: [SlackService],
})
export class SlackModule {}
