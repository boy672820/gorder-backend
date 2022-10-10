import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@core/common/decorators/auth';
import { CreateOrderDto, CreateOrderQueriesDto } from './dto';
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
    return this.service.create(user, type, data);
  }
}
