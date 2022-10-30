import { Module } from '@nestjs/common';
import { KakaoController } from './controller';
import { KakaoService } from './service';

@Module({
  providers: [KakaoService],
  controllers: [KakaoController],
})
export class KakaoModule {}
