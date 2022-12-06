import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';
import { ORDER_SELECT } from './constants';

// type OrderGroupByProductArgs = {
//   where: { type: Order['type']; status?: Order['status'] };
//   orderBy?: { createdAt: OrderBy };
//   skip?: number;
//   take?: number;
// };

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  // async ordersGroupByProduct({
  //   where,
  //   orderBy,
  //   skip,
  //   take,
  // }: OrderGroupByProductArgs) {
  //   const orders = await this.prisma.$queryRawUnsafe<Order[]>(
  //     `SELECT
  //       o.orderId,
  //       o.amount,
  //       o.orderType,
  //       o.orderStatus,
  //       o.createdAt,
  //       u.email,
  //       p.name,
  //       p.basePrice,
  //       p.discount,
  //       p.totalPrice,
  //       count(op.productId) AS totalProductCount
  //     FROM gorder.Order AS o
  //     LEFT JOIN gorder.User AS u ON o.userId = u.userId
  //     LEFT JOIN gorder.OrderHasProduct AS op ON op.orderId = o.orderId
  //     LEFT JOIN gorder.Product AS p ON p.productId = op.productId
  //     WHERE o.orderType = '${where.type}' ${
  //       where?.status ? `AND o.orderStatus = '${where.status}'` : ''
  //     }
  //     GROUP BY op.productId, op.orderId
  //     ${orderBy?.createdAt ? `ORDER BY o.createdAt ${orderBy.createdAt}` : ''}`,
  //   );

  //   const transformedOrders = orders.map((order) => ({ ...order }));

  //   return transformedOrders;
  // }

  async ordersGroupByProduct(
    params: Pick<
      Prisma.OrderFindManyArgs,
      'where' | 'orderBy' | 'take' | 'skip'
    >,
  ) {
    const orders = await this.prisma.order.findMany({
      ...params,
      // select: ORDER_SELECT,
      select: ORDER_SELECT,
    });

    const transformedOrders = orders.map((order) => {
      const countOf = {};

      const serializeProducts = order.orderHasProducts.reduce((cur, row) => {
        const { productId } = row.product;

        countOf[productId] = countOf[productId] ? countOf[productId] + 1 : 1;

        if (countOf[productId] > 1) {
          return cur;
        }

        cur.push({ ...row.product, totalProductCount: countOf[productId] });

        return cur;
      }, [] as any);

      console.log(countOf);

      const orderHasProducts = serializeProducts.map((product) => {
        for (const productId in countOf) {
          if (product.productId === Number(productId)) {
            product.totalProductCount = countOf[productId];
          }
        }

        return product;
      });

      // for (const index in existList) {
      //   console.log(index, existList[index]);
      //   // orderHasProducts[index].totalProductCount = existList[index];
      // }

      return { ...order, orderHasProducts };
    });

    return transformedOrders;
  }

  create(params: Prisma.OrderCreateArgs): Promise<Order> {
    return this.prisma.order.create(params);
  }
}
