import { PrismaClient, Prisma } from '@prisma/client';
import { OrderType } from '../enum';

const seedName = 'OrderType';
const prisma = new PrismaClient().orderType;

const inputs: Prisma.OrderTypeCreateInput[] = [
  { orderType: OrderType.Order },
  { orderType: OrderType.Pickup },
];

export async function orderType() {
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
