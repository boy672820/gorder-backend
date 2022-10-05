import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { InvalidCredentialsException } from '@core/common/errors/auth';
import { JwtService } from '@utils/jwt';
import type { AuthResult, JWTPayloadClaims } from '@core/authentication/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type AuthToken = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthSignInterceptor<T = AuthResult> implements NestInterceptor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * 로그인 인증토큰 생성
   * @param userId 사용자 PK
   * @returns 인증토큰
   */
  private generateToken(userId: User['userId']): string {
    return this.jwt.sign<JWTPayloadClaims>('access', {
      userId: userId.toString(),
    });
  }

  /**
   * 로그인 인증토큰 생성(갱신용)
   * @param userId 사용자 PK
   * @returns 인증토큰(갱신용)
   */
  private generateRefreshToken(userId: User['userId']): string {
    return this.jwt.sign<JWTPayloadClaims>(
      'refresh',
      { userId: userId.toString() },
      { expiresIn: '7d' },
    );
  }

  /**
   * 로그인 인증토큰 업데이트
   * @param param0
   * @returns
   */
  private async updateAuth(
    where: Prisma.AuthenticationWhereUniqueInput,
    data: Prisma.AuthenticationUpdateInput,
  ): Promise<void> {
    await this.prisma.authentication.update({
      where,
      data,
    });
  }

  // -----------------------------------------------------------------------

  /**
   * 인터셉터: 요청 후 처리
   * 로그인 인증토큰 생성
   * @param data
   * @returns
   */
  private after(data: T): T & AuthToken {
    if (!data || !('userId' in data)) {
      throw new InvalidCredentialsException();
    }

    const result = data as T & AuthResult;
    const userId = result.userId;

    const accessToken = this.generateToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    const auth = { accessToken, refreshToken };

    this.updateAuth({ userId }, auth);

    delete result.userId;
    return { ...result, ...auth };
  }

  // -----------------------------------------------------------------------

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map<T, AuthToken>((data) => this.after(data)));
  }
}
