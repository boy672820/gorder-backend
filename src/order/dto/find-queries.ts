import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderQueriesDto } from './create-queries';
import { OrderBy } from '@providers/mysql/prisma/enum';

export class FindOrderQueriesDto extends CreateOrderQueriesDto {
  @IsOptional()
  @IsEnum(OrderBy, { message: '존재하지 않는 정렬 방식입니다.' })
  readonly orderBy: OrderBy;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
    { message: '페이지는 number 타입이여야 합니다.' },
  )
  @IsPositive({ message: '페이지는 0 이상이어야 합니다.' })
  @Type(() => Number)
  readonly skip?: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false },
    { message: '페이지는 number 타입이여야 합니다.' },
  )
  @IsPositive({ message: '페이지는 0 이상이어야 합니다.' })
  @Type(() => Number)
  readonly take?: number;
}
