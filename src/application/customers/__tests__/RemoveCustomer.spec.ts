/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { Customer } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { MemoryCustomersRepository } from '@infra/database/repositories';
import faker from 'faker';
import { v4 } from 'uuid';

import { BaseAppException } from '@shared/excpetions';

import { RemoveCustomer } from '../RemoveCustomer';

let deleteCustomer: RemoveCustomer;
let customerRepository: ICustomerRepository;

describe('UseCase - RemoveCustomer', () => {
  beforeEach(async () => {
    customerRepository = new MemoryCustomersRepository();
    deleteCustomer = new RemoveCustomer(customerRepository);
  });

  it('should be able to delete registered customers by id!', async () => {
    const customer = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Garcia',
      genre: faker.random.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer, '');

    const customerOrError = await deleteCustomer.run(customer.id);

    expect(customerOrError.isError).toBe(false);
    expect(customerOrError.value).toBe(null);

    expect(await customerRepository.findById(customer.id)).toBe(null);
    expect(await customerRepository.list()).toEqual([]);
  });

  it('should not be able to delete customers registered by non-existent id!', async () => {
    const customerOrError = await deleteCustomer.run(v4());
    const customerOrError2 = await deleteCustomer.run(undefined);
    const customerOrError3 = await deleteCustomer.run(null);
    const customerOrError4 = await deleteCustomer.run('');

    expect(customerOrError.isError).toBe(true);
    expect(customerOrError2.isError).toBe(true);
    expect(customerOrError3.isError).toBe(true);
    expect(customerOrError4.isError).toBe(true);

    const customerFinded = customerOrError.value as BaseAppException;
    const customerFinded2 = customerOrError2.value as BaseAppException;
    const customerFinded3 = customerOrError3.value as BaseAppException;
    const customerFinded4 = customerOrError4.value as BaseAppException;

    expect(customerFinded.name).toEqual('CustomerNotFoundError');
    expect(customerFinded2.name).toEqual('CustomerNotFoundError');
    expect(customerFinded3.name).toEqual('CustomerNotFoundError');
    expect(customerFinded4.name).toEqual('CustomerNotFoundError');
  });
});
