import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InvalidProductIdException } from '@core/common/errors/order';

@Injectable()
export class PrismaExceptionCatcher {
  transformException(exception: Prisma.PrismaClientKnownRequestError) {
    const meta = exception?.meta as any;

    if (exception.code === 'P2003') {
      if (meta?.field_name === 'productId') {
        throw new InvalidProductIdException();
      }
    }

    return new InternalServerErrorException();
  }
}
