import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  orders(params: {
    where: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    return this.prisma.order.findMany(params);
  }

  create(params: Prisma.OrderCreateArgs): Promise<Order> {
    return this.prisma.order.create(params);
  }
}
