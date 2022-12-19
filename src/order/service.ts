import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { OrderStatus } from '../../core/src/providers/mysql/prisma/enum';
import { ORDER_SELECT } from './constants';
import { CreateOrderDto } from './dto';

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

        cur.push({ ...row.product, quantity: countOf[productId] });

        return cur;
      }, [] as any);

      const orderHasProducts = serializedProducts.map((product) => {
        for (const productId in countOf) {
          if (product.productId === Number(productId)) {
            product.basePrice = countOf[productId] * product.basePrice;
            product.totalPrice = countOf[productId] * product.totalPrice;
            product.quantity = countOf[productId];
          }
        }

        return product;
      });

      return { ...order, orderHasProducts };
    });

    return transformedOrders;
  }

  async ordersGroupByProduct(params: OrderFindManyArgs) {
    const [
      pendingOrders,
      confirmedOrders,
      deliveringOrders,
      completedOrders,
      cancelledOrders,
    ] = await this.prisma.$transaction([
      this._orders({
        ...params,
        where: { ...params.where, status: OrderStatus.Pending },
      }),
      this._orders({
        ...params,
        where: { ...params.where, status: OrderStatus.Confirmed },
      }),
      this._orders({
        ...params,
        where: { ...params.where, status: OrderStatus.Delivering },
      }),
      this._orders({
        ...params,
        where: { ...params.where, status: OrderStatus.Completed },
      }),
      this._orders({
        ...params,
        where: { ...params.where, status: OrderStatus.Cancelled },
      }),
    ]);

    return {
      pendingOrders: this.groupByProduct(pendingOrders),
      confirmedOrders: this.groupByProduct(confirmedOrders),
      deliveringOrders: this.groupByProduct(deliveringOrders),
      completedOrders: this.groupByProduct(completedOrders),
      cancelledOrders: this.groupByProduct(cancelledOrders),
    };
  }

  async create(params: OrderCreateArgs) {
    const newOrder = await this.prisma.order.create({
      ...params,
      select: ORDER_SELECT,
    });

    return this.groupByProduct([newOrder])[0];
  }

  productSummarizeAllPrices(
    createProducts: CreateOrderDto['orderHasProducts']['create'],
  ) {
    return this.prisma.$transaction(
      async (txClient: Prisma.TransactionClient) => {
        let totalPrice = 0;
        let discountPrice = 0;
        let basePrice = 0;

        for (const product of createProducts) {
          const { productId } = product;

          const productData = await txClient.product.findUnique({
            where: { productId },
            select: { basePrice: true, discountPrice: true, totalPrice: true },
          });

          totalPrice += productData.totalPrice;
          discountPrice += productData.discountPrice;
          basePrice += productData.basePrice;
        }

        return { totalPrice, discountPrice, basePrice };
      },
    );
  }
}
