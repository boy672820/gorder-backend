import { Injectable } from '@nestjs/common';
import { PrismaService } from '@providers/mysql/prisma';
import { OrderStatus, OrderType } from '@providers/mysql/prisma/enum';
import { CreateOrderDto } from './dto';
import type { JWTUserPayload } from '@core/authentication';
import { OrderHasProduct, PrismaPromise } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: JWTUserPayload, type: OrderType, data: CreateOrderDto) {
    return this.prisma.$transaction<void>(async (tx) => {
      const newOrder = await this.prisma.order.create({
        data: {
          amount: data.amount,
          user: { connect: { userId: user.userId } },
          orderType: { connect: { orderType: type } },
          orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
        },
      });

      const products = data.products.reduce((acc, productId) => {
        acc.push(
          tx.orderHasProduct.create({
            data: {
              productId,
              orderId: newOrder.orderId,
              storeId: data.storeId,
              userId: user.userId,
            },
          }),
        );
        return acc;
      }, [] as PrismaPromise<OrderHasProduct>[]);

      await Promise.all(products);
    });
  }
}
