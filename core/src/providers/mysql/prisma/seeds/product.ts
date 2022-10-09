import { PrismaClient } from '@prisma/client';

const seedName = 'Product';
const prisma = new PrismaClient().product;

const inputs = [
  {
    store: { connect: { storeId: 1 } },
    name: '아메리카노 ICE',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '아메리카노 HOT',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '헤이즐럿 아메리카노 ICE',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '헤이즐럿 아메리카노 HOT',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '카페라떼 ICE',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '카페라떼 HOT',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '연유라떼 ICE',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '연유라떼 HOT',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '바닐라라떼 ICE',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '바닐라라떼 HOT',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '카라멜마끼아또 ICE',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '카라멜마끼아또 HOT',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '콜드브루 아메리카노',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '콜드브루 라떼',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '복숭아 아이스티',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '레몬 아이스티',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '캐모마일',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '얼그레이',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '페퍼민트',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '히비스커스',
    basePrice: 3000,
    discount: 50,
    totalPrice: 1500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '청귤차',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '자몽차',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '유자차',
    basePrice: 3500,
    discount: 50,
    totalPrice: 1750,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '허니자몽블랙티',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '애플유자티',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '피치코크',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '자몽에이드',
    basePrice: 4000,
    discount: 50,
    totalPrice: 2000,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '청포도에이드',
    basePrice: 4200,
    discount: 50,
    totalPrice: 2100,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '하와이언에이드',
    basePrice: 4200,
    discount: 50,
    totalPrice: 2100,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '오렌지에이드',
    basePrice: 4200,
    discount: 50,
    totalPrice: 2100,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '청귤에이드',
    basePrice: 4200,
    discount: 50,
    totalPrice: 2100,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '퐁 크러쉬',
    basePrice: 4500,
    discount: 50,
    totalPrice: 2250,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '플레인',
    basePrice: 4500,
    discount: 50,
    totalPrice: 2250,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '딸기스무디',
    basePrice: 5000,
    discount: 50,
    totalPrice: 2500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '망고스무디',
    basePrice: 5000,
    discount: 50,
    totalPrice: 2500,
  },
  {
    store: { connect: { storeId: 1 } },
    name: '블루베리스무디',
    basePrice: 5000,
    discount: 50,
    totalPrice: 2500,
  },
];

export async function product() {
  console.log(`Start "${seedName}" seeding ...`);

  const promises = [];
  let number = 1;

  for (const data of inputs) {
    promises.push(
      prisma.upsert({
        where: { name: data.name },
        create: { ...data, number },
        update: { ...data, number },
      }),
    );
    number += 1;
  }

  await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
