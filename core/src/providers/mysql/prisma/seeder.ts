import { PrismaClient } from '@prisma/client';
import { orderStatus, orderType, store, product, order } from './seeds';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    orderType(),
    orderStatus(),
    store().then(() => product().then(() => order())),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
