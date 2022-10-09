import { Module } from '@nestjs/common';
import { ProductController } from './controller';
import { ProductService } from './service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
