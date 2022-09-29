import { PrismaClient } from '@prisma/client';
import { orderStatus, orderType } from './seeds';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([orderType(), orderStatus()]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
