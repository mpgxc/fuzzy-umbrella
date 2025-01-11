import 'reflect-metadata';

import { ListCustomer } from '@application/customers/ListCustomer';
import { Customer } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { faker } from '@faker-js/faker';
import { MemoryCustomersRepository } from '@infra/database/repositories';

let listCustomer: ListCustomer;
let customerRepository: ICustomerRepository;

describe('UseCase - ListCustomer', () => {
  beforeEach(async () => {
    customerRepository = new MemoryCustomersRepository();
    listCustomer = new ListCustomer(customerRepository);
  });

  it('should be to list all registered customers by name!', async () => {
    const customer1 = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Garcia',
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    const customer2 = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Luzia',
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    const customer3 = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Pinto',
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer1, '');
    await customerRepository.create(customer2, '');
    await customerRepository.create(customer3, '');

    const customers = await listCustomer.run('Mateus Pinto');
    expect(customers).toBeTruthy();
    expect(customers.length).toBe(1);
    expect(customers[0].full_name).toBe('Mateus Pinto');
  });

  it('should be to list all registered customers!', async () => {
    const customer1 = Customer.build({
      birth_date: faker.date.past(),
      full_name: faker.person.fullName(),
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    const customer2 = Customer.build({
      birth_date: faker.date.past(),
      full_name: faker.person.fullName(),
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    const customer3 = Customer.build({
      birth_date: faker.date.past(),
      full_name: faker.person.fullName(),
      genre: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer1, '');
    await customerRepository.create(customer2, '');
    await customerRepository.create(customer3, '');

    const customers = await listCustomer.run();

    expect(customers.length).toEqual(3);

    const [first] = customers;

    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('genre');
    expect(first).toHaveProperty('full_name');
    expect(first).toHaveProperty('birth_date');
  });
});
