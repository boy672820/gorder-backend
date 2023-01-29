import { PipeTransform } from '@nestjs/common';
import { OrderStatus } from '@providers/mysql/prisma/enum';
import { BadOrderStatusException } from '@core/common/errors/order';

export class OrderStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    const enumValues = Object.values(OrderStatus);

    if (!enumValues.includes(value)) {
      throw new BadOrderStatusException();
    }

    return value;
  }
}
