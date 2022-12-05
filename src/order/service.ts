import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { OrderBy } from '@providers/mysql/prisma/enum';

type OrderGroupByProductArgs = {
  where: { type: Order['type']; status?: Order['status'] };
  orderBy?: { createdAt: OrderBy };
  skip?: number;
  take?: number;
};

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  ordersGroupByProduct({
    where,
    orderBy,
    skip,
    take,
  }: OrderGroupByProductArgs) {
    return this.prisma.$queryRawUnsafe<Order[]>(
      `SELECT
        o.orderId,
        o.amount,
        o.orderType,
        o.orderStatus,
        o.createdAt,
        u.email,
        p.name,
        p.basePrice,
        p.discount,
        p.totalPrice,
        count(op.productId) AS totalProductCount
      FROM gorder.Order AS o
      LEFT JOIN gorder.User AS u ON o.userId = u.userId
      LEFT JOIN gorder.OrderHasProduct AS op ON op.orderId = o.orderId
      LEFT JOIN gorder.Product AS p ON p.productId = op.productId
      WHERE o.orderType = '${where.type}' ${
        where?.status ? `AND o.orderStatus = '${where.status}'` : ''
      }
      GROUP BY op.productId, op.orderId
      ${orderBy?.createdAt ? `ORDER BY o.createdAt ${orderBy.createdAt}` : ''}`,
    );
  }

  create(params: Prisma.OrderCreateArgs): Promise<Order> {
    return this.prisma.order.create(params);
  }
}
