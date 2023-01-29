import { Prisma, PrismaClient } from '@prisma/client';
import { OrderStatus, OrderType } from '../enum';

const seedName = 'Order';
const prisma = new PrismaClient();

const orderedUser: Prisma.UserCreateInput = {
  email: 'order@geniesoft.io',
  name: '이선주',
  authentication: { create: {} },
};

const inputs: Prisma.OrderCreateInput[] = [
  {
    orderId: 1,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [{ productId: 1 }, { productId: 1 }],
      },
    },
    basePrice: 6000,
    discountPrice: 3000,
    totalPrice: 3000,
  },
  {
    orderId: 2,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [{ productId: 1 }, { productId: 5 }, { productId: 9 }],
      },
    },
    basePrice: 15000,
    discountPrice: 5250,
    totalPrice: 5250,
  },
  {
    orderId: 3,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [
          { productId: 16 },
          { productId: 17 },
          { productId: 26 },
          { productId: 27 },
        ],
      },
    },
    basePrice: 14000,
    discountPrice: 7000,
    totalPrice: 7000,
  },
  {
    orderId: 4,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Confirmed } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [
          { productId: 16 },
          { productId: 17 },
          { productId: 26 },
          { productId: 27 },
        ],
      },
    },
    basePrice: 14000,
    discountPrice: 7000,
    totalPrice: 7000,
  },
  {
    orderId: 5,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Confirmed } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [
          { productId: 16 },
          { productId: 17 },
          { productId: 26 },
          { productId: 27 },
        ],
      },
    },
    basePrice: 14000,
    discountPrice: 7000,
    totalPrice: 7000,
  },
  {
    orderId: 6,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Completed } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [
          { productId: 16 },
          { productId: 17 },
          { productId: 26 },
          { productId: 27 },
        ],
      },
    },
    basePrice: 14000,
    discountPrice: 7000,
    totalPrice: 7000,
  },
  {
    orderId: 7,
    user: {
      connect: { email: orderedUser.email },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Cancelled } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [
          { productId: 16 },
          { productId: 17 },
          { productId: 26 },
          { productId: 27 },
        ],
      },
    },
    basePrice: 14000,
    discountPrice: 7000,
    totalPrice: 7000,
  },
];

export async function order() {
  console.log(`Start "${seedName}" seeding ...`);

  const promises = [];

  await prisma.user.upsert({
    where: { email: orderedUser.email },
    create: { ...orderedUser },
    update: { ...orderedUser },
  });

  for (const data of inputs) {
    promises.push(
      prisma.order.upsert({
        where: { orderId: data.orderId },
        create: { ...data },
        update: { ...data },
      }),
    );
  }

  await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
