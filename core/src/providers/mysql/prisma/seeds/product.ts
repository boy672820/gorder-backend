import { PrismaClient } from '@prisma/client';

const seedName = 'Product';
const prisma = new PrismaClient().product;

const inputs = [
  {
    productId: 1,
    store: { connect: { storeId: 1 } },
    name: '아메리카노 ICE',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 2,
    store: { connect: { storeId: 1 } },
    name: '아메리카노 HOT',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 3,
    store: { connect: { storeId: 1 } },
    name: '헤이즐럿 아메리카노 ICE',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 4,
    store: { connect: { storeId: 1 } },
    name: '헤이즐럿 아메리카노 HOT',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 5,
    store: { connect: { storeId: 1 } },
    name: '카페라떼 ICE',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 6,
    store: { connect: { storeId: 1 } },
    name: '카페라떼 HOT',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 7,
    store: { connect: { storeId: 1 } },
    name: '연유라떼 ICE',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 8,
    store: { connect: { storeId: 1 } },
    name: '연유라떼 HOT',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 9,
    store: { connect: { storeId: 1 } },
    name: '바닐라라떼 ICE',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 10,
    store: { connect: { storeId: 1 } },
    name: '바닐라라떼 HOT',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 11,
    store: { connect: { storeId: 1 } },
    name: '카라멜마끼아또 ICE',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 12,
    store: { connect: { storeId: 1 } },
    name: '카라멜마끼아또 HOT',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 13,
    store: { connect: { storeId: 1 } },
    name: '콜드브루 아메리카노',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 14,
    store: { connect: { storeId: 1 } },
    name: '콜드브루 라떼',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 15,
    store: { connect: { storeId: 1 } },
    name: '복숭아 아이스티',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 16,
    store: { connect: { storeId: 1 } },
    name: '레몬 아이스티',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 17,
    store: { connect: { storeId: 1 } },
    name: '캐모마일',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 18,
    store: { connect: { storeId: 1 } },
    name: '얼그레이',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 19,
    store: { connect: { storeId: 1 } },
    name: '페퍼민트',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 20,
    store: { connect: { storeId: 1 } },
    name: '히비스커스',
    basePrice: 3000,
    discountPrice: 3000 / 2,
    discountPercent: 50,
    totalPrice: 3000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 21,
    store: { connect: { storeId: 1 } },
    name: '청귤차',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 22,
    store: { connect: { storeId: 1 } },
    name: '자몽차',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 23,
    store: { connect: { storeId: 1 } },
    name: '유자차',
    basePrice: 3500,
    discountPrice: 3500 / 2,
    discountPercent: 50,
    totalPrice: 3500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 24,
    store: { connect: { storeId: 1 } },
    name: '허니자몽블랙티',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 25,
    store: { connect: { storeId: 1 } },
    name: '애플유자티',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 26,
    store: { connect: { storeId: 1 } },
    name: '피치코크',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 27,
    store: { connect: { storeId: 1 } },
    name: '자몽에이드',
    basePrice: 4000,
    discountPrice: 4000 / 2,
    discountPercent: 50,
    totalPrice: 4000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 28,
    store: { connect: { storeId: 1 } },
    name: '청포도에이드',
    basePrice: 4200,
    discountPrice: 4200 / 2,
    discountPercent: 50,
    totalPrice: 4200 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 29,
    store: { connect: { storeId: 1 } },
    name: '하와이언에이드',
    basePrice: 4200,
    discountPrice: 4200 / 2,
    discountPercent: 50,
    totalPrice: 4200 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 30,
    store: { connect: { storeId: 1 } },
    name: '오렌지에이드',
    basePrice: 4200,
    discountPrice: 4200 / 2,
    discountPercent: 50,
    totalPrice: 4200 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 31,
    store: { connect: { storeId: 1 } },
    name: '청귤에이드',
    basePrice: 4200,
    discountPrice: 4200 / 2,
    discountPercent: 50,
    totalPrice: 4200 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 32,
    store: { connect: { storeId: 1 } },
    name: '퐁 크러쉬',
    basePrice: 4500,
    discountPrice: 4500 / 2,
    discountPercent: 50,
    totalPrice: 4500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 33,
    store: { connect: { storeId: 1 } },
    name: '플레인',
    basePrice: 4500,
    discountPrice: 4500 / 2,
    discountPercent: 50,
    totalPrice: 4500 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 34,
    store: { connect: { storeId: 1 } },
    name: '딸기스무디',
    basePrice: 5000,
    discountPrice: 5000 / 2,
    discountPercent: 50,
    totalPrice: 5000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 35,
    store: { connect: { storeId: 1 } },
    name: '망고스무디',
    basePrice: 5000,
    discountPrice: 5000 / 2,
    discountPercent: 50,
    totalPrice: 5000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
  {
    productId: 36,
    store: { connect: { storeId: 1 } },
    name: '블루베리스무디',
    basePrice: 5000,
    discountPrice: 5000 / 2,
    discountPercent: 50,
    totalPrice: 5000 / 2,
    imageUrl:
      'https://minimal-assets-api-dev.vercel.app/assets/images/products/product_1.jpg',
  },
];

export async function product() {
  console.log(`Start "${seedName}" seeding ...`);

  const promises = [];
  let number = 1;

  for (const data of inputs) {
    promises.push(
      prisma.upsert({
        where: { productId: data.productId },
        create: { ...data, number },
        update: {
          store: data.store,
          name: data.name,
          basePrice: data.basePrice,
          discountPercent: data.discountPercent,
          discountPrice: data.discountPrice,
          totalPrice: data.totalPrice,
          imageUrl: data.imageUrl,
          number,
        },
      }),
    );
    number += 1;
  }

  await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
