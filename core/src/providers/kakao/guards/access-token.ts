import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { KakaoService } from '../service';

@Injectable()
export class KakaoAccessTokenGuard implements CanActivate {
  constructor(private readonly service: KakaoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { code } = request.query;

    if (!code) {
      throw new UnauthorizedException();
    }

    try {
      request.user = await this.service.authorize(code);

      return true;
    } catch (_) {
      return false;
    }
  }
}
