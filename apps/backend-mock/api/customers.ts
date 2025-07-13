import { faker } from '@faker-js/faker';

export function generateCustomers(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    };

    dataList.push(dataItem);
  }

  return dataList;
}
