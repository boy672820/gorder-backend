import { Prisma } from '@prisma/client';

export const ORDER_SELECT: Prisma.OrderSelect = {
  orderId: true,
  amount: true,
  type: true,
  status: true,
  createdAt: true,
  user: { select: { email: true } },
  orderHasProducts: {
    select: {
      product: {
        select: {
          name: true,
          basePrice: true,
          discount: true,
          totalPrice: true,
        },
      },
    },
  },
};
