import { Module } from '@nestjs/common';
import { OrderController } from './controller';
import { OrderService } from './service';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
