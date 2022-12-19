export const ORDER_SELECT = {
  orderId: true,
  basePrice: true,
  discountPrice: true,
  totalPrice: true,
  type: true,
  status: true,
  createdAt: true,
  user: { select: { email: true } },
  orderHasProducts: {
    select: {
      product: {
        select: {
          productId: true,
          name: true,
          basePrice: true,
          discountPrice: true,
          discountPercent: true,
          totalPrice: true,
          imageUrl: true,
        },
      },
    },
  },
  _count: { select: { orderHasProducts: true } },
};
