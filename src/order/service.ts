import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { ORDER_SELECT } from './constants';

type OrderFindManyArgs = Pick<
  Prisma.OrderFindManyArgs,
  'where' | 'orderBy' | 'skip' | 'take'
>;

type OrderCreateArgs = Pick<Prisma.OrderCreateArgs, 'data'>;

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  private _orders(params: OrderFindManyArgs) {
    return this.prisma.order.findMany({ ...params, select: ORDER_SELECT });
  }

  private groupByProduct(
    orders: Prisma.PromiseReturnType<typeof this._orders>,
  ) {
    const transformedOrders = orders.map((order) => {
      const countOf = {};

      const serializedProducts = order.orderHasProducts.reduce((cur, row) => {
        const { productId } = row.product;

        countOf[productId] = countOf[productId] ? countOf[productId] + 1 : 1;

        if (countOf[productId] > 1) {
          return cur;
        }

        cur.push({ ...row.product, totalProductCount: countOf[productId] });

        return cur;
      }, [] as any);

      const orderHasProducts = serializedProducts.map((product) => {
        for (const productId in countOf) {
          if (product.productId === Number(productId)) {
            product.basePrice = countOf[productId] * product.basePrice;
            product.totalPrice = countOf[productId] * product.totalPrice;
            product.totalProductCount = countOf[productId];
          }
        }

        return product;
      });

      return { ...order, orderHasProducts };
    });

    return transformedOrders;
  }

  async ordersGroupByProduct(params: OrderFindManyArgs) {
    const orders = await this._orders(params);

    return this.groupByProduct(orders);
  }

  async create(params: OrderCreateArgs) {
    const newOrder = await this.prisma.order.create({
      ...params,
      select: ORDER_SELECT,
    });

    return this.groupByProduct([newOrder])[0];
  }
}
