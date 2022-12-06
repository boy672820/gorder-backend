export const ORDER_SELECT = {
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
          productId: true,
          name: true,
          basePrice: true,
          discount: true,
          totalPrice: true,
        },
      },
    },
  },
};
