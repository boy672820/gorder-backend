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
    amount: 0,
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
        data: [{ productId: 1 }],
      },
    },
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
