import { PrismaClient, Prisma } from '@prisma/client';
import { OrderStatus } from '../enum';

const seedName = 'OrderStatus';
const prisma = new PrismaClient().orderStatus;

const inputs: Prisma.OrderStatusCreateInput[] = [
  { orderStatus: OrderStatus.Pending },
  { orderStatus: OrderStatus.Confirmed },
  { orderStatus: OrderStatus.Cancelled },
  { orderStatus: OrderStatus.Completed },
];

export async function orderStatus() {
  console.log(`Start "${seedName}" seeding ...`);

  const promises = [];

  for (const data of inputs) {
    promises.push(
      prisma.upsert({
        where: data,
        create: data,
        update: data,
      }),
    );
  }

  await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
