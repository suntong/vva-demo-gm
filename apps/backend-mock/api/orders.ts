import { faker } from '@faker-js/faker';

export function generateOrders(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      id: faker.string.uuid(),
      orderDate: faker.date.past(),
      status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered']),
      total: faker.commerce.price(),
      customerId: faker.string.uuid(),
      productId: faker.string.uuid(),
    };

    dataList.push(dataItem);
  }

  return dataList;
}
