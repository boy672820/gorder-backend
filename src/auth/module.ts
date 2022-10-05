import { Module } from '@nestjs/common';
import { SlackModule } from '@providers/slack';
import { JwtModule } from '@utils/jwt';
import { AuthService } from './service';
import { AuthController } from './controller';

@Module({
  imports: [SlackModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
