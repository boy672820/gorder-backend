import { OrderBy } from '@providers/mysql/prisma/enum';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderQueriesDto } from './create-queries';

export class FindOrderQueriesDto extends CreateOrderQueriesDto {
  @IsOptional()
  @IsEnum(OrderBy, { message: '존재하지 않는 정렬 방식입니다.' })
  readonly orderBy: OrderBy;
}
