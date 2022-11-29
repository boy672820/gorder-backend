import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto implements Prisma.OrderCreateInput {
  @ApiProperty({ description: '거래량' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '거래량은 숫자만 입력 가능합니다.' },
  )
  @IsPositive({ message: '거래량은 0보다 커야 합니다.' })
  readonly amount: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '잘못된 상품정보 입니다.', each: true },
  )
  readonly products: Array<number>;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '잘못된 상점정보 입니다.' },
  )
  readonly storeId: number;

  // ------------------------------------------------------------------------

  orderStatus: Prisma.OrderStatusCreateNestedOneWithoutOrderInput;
  orderType: Prisma.OrderTypeCreateNestedOneWithoutOrderInput;
  // product: Prisma.ProductCreateNestedOneWithoutOrderInput;
  user: Prisma.UserCreateNestedOneWithoutOrderInput;
}
