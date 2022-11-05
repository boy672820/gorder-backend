import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { User } from '@core/common/decorators/auth';
import { OrderStatus, Store } from '@providers/mysql/prisma/enum';
import {
  CreateOrderDto,
  CreateOrderQueriesDto,
  FindOrderQueriesDto,
} from './dto';
import { OrderService } from './service';
import type { JWTUserPayload } from '@core/authentication';

@ApiTags('주문')
@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @ApiOperation({ summary: '상품 주문하기' })
  @Post()
  create(
    @User() user: JWTUserPayload,
    @Query() { type }: CreateOrderQueriesDto,
    @Body() data: CreateOrderDto,
  ) {
    const inputs = data.products.reduce((acc, productId) => {
      acc.push({
        productId,
        userId: user.userId,
        amount: data.amount,
        type,
        status: OrderStatus.Pending,
        storeId: Store.Genie,
      });

      return acc;
    }, [] as Prisma.OrderCreateManyInput[]);

    return this.service.createMany(inputs);
  }

  @Get()
  orders(@Query() { type, orderBy }: FindOrderQueriesDto) {
    return this.service.orders({
      where: { type },
      orderBy: { createdAt: orderBy },
    });
  }
}
