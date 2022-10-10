import { CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '@providers/mysql/prisma';
import { Observable } from 'rxjs';

export class CheckProductGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { products } = request.body;

    // TODO: Check if products are valid
    if (
      products instanceof Array ||
      products.length <= 0 ||
      products.some((product) => !product.productId || !product.quantity)
    ) {
      return false;
    }

    return true;
  }
}
