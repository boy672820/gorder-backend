import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { AuthServiceFactory } from '@libs/auth';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService implements AuthServiceFactory {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    // const user = await this.prisma.user.findUnique({});

    // if (!user) {
    //   return null;
    // }

    // const isPassword = await argon2.verify(user.password, password);

    // if (!isPassword) {
    //   return null;
    // }

    return 'user';
  }
}
