import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderType } from '@providers/mysql/prisma/enum';

export class CreateOrderQueriesDto {
  @IsNotEmpty({ message: '주문 종류를 입력해주세요.' })
  @IsEnum(OrderType, { message: '존재하지 않는 주문 종류입니다.' })
  readonly type: OrderType;
}
