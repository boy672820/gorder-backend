import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoConfigModule } from '@config';
import { HttpConfigService } from './http.config.service';
import { KakaoOAuthService } from './service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [KakaoConfigModule],
      useClass: HttpConfigService,
    }),
    KakaoConfigModule,
  ],
  providers: [KakaoOAuthService],
  exports: [KakaoOAuthService],
})
export class KakaoOAuth {}
