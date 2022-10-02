import { Module } from '@nestjs/common';
import { SlackModule } from '@providers/slack';
import { AuthService } from './service';
import { AuthController } from './controller';

@Module({
  imports: [SlackModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
