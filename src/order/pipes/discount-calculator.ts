import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateOrderDto } from '../dto';
import { OrderService } from '../service';

@Injectable()
export class OrderDiscountCalculatorTransformPipe implements PipeTransform {
  constructor(private readonly service: OrderService) {}

  async transform(value: CreateOrderDto) {
    const { basePrice, discountPrice, totalPrice } =
      await this.service.productSummarizeAllPrices(
        value.orderHasProducts.create,
      );

    value.basePrice = basePrice;
    value.discountPrice = discountPrice;
    value.totalPrice = totalPrice;

    return value;
  }
}
