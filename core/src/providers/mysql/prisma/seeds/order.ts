import { Prisma, PrismaClient } from '@prisma/client';
import { OrderStatus, OrderType } from '../enum';

const seedName = 'Order';
const prisma = new PrismaClient().order;

const orderedUser: Prisma.UserCreateInput = {
  email: 'order@geniesoft.io',
  authentication: { create: {} },
};

const inputs: Prisma.OrderCreateInput[] = [
  {
    orderId: 1,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [{ productId: 1 }, { productId: 1 }],
      },
    },
    amount: 3000,
  },
  {
    orderId: 2,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
    },
    orderType: { connect: { orderType: OrderType.Order } },
    orderStatus: { connect: { orderStatus: OrderStatus.Pending } },
    orderHasProducts: {
      createMany: {
        skipDuplicates: true,
        data: [{ productId: 1 }, { productId: 5 }, { productId: 9 }],
      },
    },
    amount: 5250,
  },
  {
    orderId: 3,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
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
    amount: 7000,
  },
  {
    orderId: 4,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
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
    amount: 7000,
  },
  {
    orderId: 5,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
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
    amount: 7000,
  },
  {
    orderId: 6,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
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
    amount: 7000,
  },
  {
    orderId: 7,
    user: {
      connectOrCreate: {
        where: { email: orderedUser.email },
        create: orderedUser,
      },
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
    amount: 7000,
  },
];

export async function product() {
  console.log(`Start "${seedName}" seeding ...`);

  const promises = [];

  for (const data of inputs) {
    promises.push(
      prisma.upsert({
        where: { orderId: data.orderId },
        create: { ...data },
        update: { ...data },
      }),
    );
  }

  await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
