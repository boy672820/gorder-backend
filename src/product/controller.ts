import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@core/common/decorators/auth';
import { ProductService } from './service';

@ApiTags('상품')
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiOperation({ summary: '상품 전체 가져오기' })
  @Public()
  @Get()
  products() {
    return this.service.products(
      undefined,
      undefined,
      undefined,
      { storeId: 1 },
      { number: 'asc' },
    );
  }
}
