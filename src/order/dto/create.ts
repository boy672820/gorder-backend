import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Product } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class OrderHasProductUncheckedDto
  implements Prisma.OrderHasProductUncheckedCreateWithoutOrderInput
{
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '상품 PK는 숫자만 입력 가능합니다.' },
  )
  @IsPositive({ message: '상품 PK는 0보다 커야 합니다.' })
  readonly productId: Product['productId'];
}

class CreateOrderHasProductDto {
  @IsObject({ each: true })
  @ValidateNested({ message: '객체는 Object 형식이어야 합니다.' })
  @Type(() => OrderHasProductUncheckedDto)
  readonly create: Array<OrderHasProductUncheckedDto>;
}

export class CreateOrderDto implements Prisma.OrderCreateInput {
  @ApiProperty({ description: '거래량' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '거래량은 숫자만 입력 가능합니다.' },
  )
  @IsPositive({ message: '거래량은 0보다 커야 합니다.' })
  readonly amount: number;

  @ApiProperty({ description: '상품목록' })
  @IsNotEmptyObject({}, { message: '상품목록은 비어있을 수 없습니다.' })
  @IsObject()
  @ValidateNested({ message: '객체는 Object 형식이어야 합니다.' })
  @Type(() => CreateOrderHasProductDto)
  readonly orderHasProducts: CreateOrderHasProductDto;

  // --------------------------------------------------------------------------------

  orderStatus: Prisma.OrderStatusCreateNestedOneWithoutOrderInput;
  orderType: Prisma.OrderTypeCreateNestedOneWithoutOrderInput;
  user: Prisma.UserCreateNestedOneWithoutOrderInput;
}
