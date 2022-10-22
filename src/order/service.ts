import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  createMany(data: Prisma.OrderCreateManyInput[]) {
    return this.prisma.order.createMany({ data });
  }
}
