import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KakaoConfigModule } from '@config';
import { HttpConfigService } from './http.config.service';
import { KakaoApiService } from './service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [KakaoConfigModule],
      useClass: HttpConfigService,
    }),
  ],
  providers: [KakaoApiService],
  exports: [KakaoApiService],
})
export class KakaoApi {}
