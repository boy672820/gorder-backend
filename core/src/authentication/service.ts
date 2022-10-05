import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';

@Injectable()
export class CoreAuthService {
  constructor(private readonly prisma: PrismaService) {}

  authentication(where: Prisma.AuthenticationWhereUniqueInput) {
    return this.prisma.authentication.findUnique({ where });
  }
}
