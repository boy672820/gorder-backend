import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductService } from './service';

@ApiTags('상품')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiOperation({ summary: '상품 전체가져오기' })
  @ApiParam({
    name: 'storeId',
    description: '매장PK',
    type: Number,
    required: false,
  })
  @Get()
  products(@Query('storeId') storeId: number) {
    return this.service.products(
      undefined,
      undefined,
      undefined,
      { storeId },
      { number: 'asc' },
    );
  }
}
