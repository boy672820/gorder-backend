import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { KakaoApi } from './api';
import { KakaoOAuth } from './oauth';

@Module({})
export class KakaoModule {
  static forRoot(modules: ModuleMetadata['imports'] = []): DynamicModule {
    if (!Array.isArray(modules) || modules.length === 0) {
      throw new Error('KakaoModule.forRoot() requires at least one module');
    }

    if (
      !modules.some((module) => module === KakaoApi || module === KakaoOAuth)
    ) {
      throw new Error(
        'KakaoModule.forRoot() requires KakaoOAuth or KakaoApi module',
      );
    }

    return {
      imports: modules,
      exports: modules,
      module: KakaoModule,
    };
  }
}
