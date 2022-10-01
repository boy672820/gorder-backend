import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { IsPassword } from '@core/common/validators';

export class CreateUserDto implements Prisma.UserCreateInput {
  userId?: number | bigint;
  realname: string;
  createdAt?: string | Date;
  updatedAt: string | Date;
  History?: Prisma.HistoryCreateNestedManyWithoutUserInput;
  Order?: Prisma.OrderCreateNestedManyWithoutUserInput;
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty()
  @IsPassword()
  readonly password: string;
}
