import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@core/common/decorators/auth';
import { OrderStatus } from '../../core/src/providers/mysql/prisma/enum';
import { OrderService } from './service';
import {
  CreateOrderDto,
  CreateOrderQueriesDto,
  FindOrderQueriesDto,
} from './dto';
import {
  OrderDiscountCalculatorTransformPipe,
  OrderStatusValidationPipe,
} from './pipes';
import type { JWTUserPayload } from '@core/authentication';
import { Order, Prisma } from '@prisma/client';
import { ORDER_SELECT } from './constants';

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
    @Body(OrderDiscountCalculatorTransformPipe) data: CreateOrderDto,
  ) {
    return this.service.create({
      data: {
        ...data,
        orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
        orderType: { connect: { orderType: type } },
        user: { connect: { userId } },
      },
    });
  }

  @ApiTags('주문 상태변경')
  @Patch(
    `:${Prisma.OrderScalarFieldEnum.orderId}/status/:${Prisma.OrderScalarFieldEnum.status}`,
  )
  confirmOrder(
    @Param(Prisma.OrderScalarFieldEnum.orderId, ParseIntPipe) orderId: number,
    @Param(Prisma.OrderScalarFieldEnum.status, OrderStatusValidationPipe)
    status: OrderStatus,
  ): Promise<Order> {
    return this.service.update({
      where: { orderId },
      data: { status },
      select: ORDER_SELECT,
    });
  }

  @ApiOperation({ summary: '주문내역 가져오기' })
  @Get()
  async orders(@Query() { type, orderBy, skip, take }: FindOrderQueriesDto) {
    const orders = await this.service.ordersGroupByProduct({
      where: { type },
      orderBy: { createdAt: orderBy },
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });

    return orders;
  }
}
