import { PrismaClient, Prisma } from '@prisma/client';

const seedName = 'Store';
const prisma = new PrismaClient().store;

const inputs: Prisma.StoreCreateInput[] = [{ name: '카페지니' }];

export async function store() {
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
