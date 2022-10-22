import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@core/common/decorators/auth';
import { CreateOrderDto, CreateOrderQueriesDto } from './dto';
import { OrderService } from './service';
import type { JWTUserPayload } from '@core/authentication';
import { OrderStatus } from '@providers/mysql/prisma/enum';
import { Prisma } from '@prisma/client';

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
        storeId: 1,
      });

      return acc;
    }, [] as Prisma.OrderCreateManyInput[]);

    return this.service.createMany(inputs);
  }
}