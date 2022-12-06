import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@core/common/decorators/auth';
import { OrderStatus } from '@providers/mysql/prisma/enum';
import {
  CreateOrderDto,
  CreateOrderQueriesDto,
  FindOrderQueriesDto,
} from './dto';
import { OrderService } from './service';
import { ORDER_SELECT } from './constants';
import type { JWTUserPayload } from '@core/authentication';
import type { Order } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

@ApiTags('주문')
@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @ApiOperation({ summary: '상품 주문하기' })
  @Post()
  create(
    @User() { userId }: JWTUserPayload,
    @Query() { type }: CreateOrderQueriesDto,
    @Body() data: CreateOrderDto,
  ) {
    return this.service.create({
      data: {
        ...data,
        orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
        orderType: { connect: { orderType: type } },
        user: { connect: { userId } },
      },
      select: ORDER_SELECT,
    });
  }

  @ApiOperation({ summary: '주문내역 가져오기' })
  @Get()
  async orders(
    @Query() { type, status, orderBy, skip, take }: FindOrderQueriesDto,
  ) {
    const orders = await this.service.ordersGroupByProduct({
      where: { type, status },
      orderBy: { createdAt: orderBy },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });

    return orders;
  }
}
