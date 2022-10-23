import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { KakaoConfigService } from '@config';
import axios, { AxiosRequestTransformer } from 'axios';
import * as qs from 'qs';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly kakaoConfig: KakaoConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: `${this.kakaoConfig.oauthUrl}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [
        (data) =>
          qs.stringify({ ...data, client_id: this.kakaoConfig.restKey }),
        ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
      ],
    };
  }
}
