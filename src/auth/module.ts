import { Module } from '@nestjs/common';
import { SlackModule } from '@providers/slack';
import { AuthService } from './service';
import { AuthController } from './controller';
import { AccessTokenStrategy } from './strategy/access-token';

@Module({
  imports: [SlackModule],
  providers: [AuthService, AccessTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
