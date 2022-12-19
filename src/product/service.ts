import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/mysql/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  products(
    skip?: number,
    take?: number,
    cursor?: Prisma.ProductWhereUniqueInput,
    where?: Prisma.ProductWhereInput,
    orderBy?: Prisma.ProductOrderByWithRelationInput,
  ) {
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        productId: true,
        name: true,
        basePrice: true,
        discountPercent: true,
        discountPrice: true,
        totalPrice: true,
      },
    });
  }
}
