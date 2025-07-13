import { faker } from '@faker-js/faker';

export function generateProducts(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      id: faker.string.uuid(),
      productName: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      inStock: faker.datatype.boolean(),
    };

    dataList.push(dataItem);
  }

  return dataList;
}
