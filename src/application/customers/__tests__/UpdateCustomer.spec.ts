/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { Customer } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { MemoryCustomersRepository } from '@infra/database/repositories';
import faker from 'faker';
import { v4 } from 'uuid';

import { BaseAppException } from '@shared/exceptions';

import { UpdateCustomer } from '../UpdateCustomer';

let updateCustomer: UpdateCustomer;
let customerRepository: ICustomerRepository;

describe('UseCase - UpdateCustomer', () => {
  beforeEach(async () => {
    customerRepository = new MemoryCustomersRepository();
    updateCustomer = new UpdateCustomer(customerRepository);
  });

  it('should be able to update customer name!', async () => {
    const customer = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Garcia',
      genre: faker.random.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer, '');

    await updateCustomer.run({
      id: customer.id,
      body: {
        full_name: 'Ana Maria Braga',
      },
    });

    let customerUpdated = await customerRepository.findById(customer.id);
    expect(customerUpdated.fullName).toEqual('Ana Maria Braga');
    expect(customerUpdated.birthDate).toEqual(customer.birthDate);

    await updateCustomer.run({
      id: customer.id,
      body: {
        full_name: 'Nome Random',
      },
    });

    customerUpdated = await customerRepository.findById(customer.id);
    expect(customerUpdated.fullName).toEqual('Nome Random');
    expect(customerUpdated.birthDate).toEqual(customer.birthDate);
  });

  it('should not be able to update customer name with null body data!', async () => {
    const customer = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Garcia',
      genre: faker.random.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer, '');

    await updateCustomer.run({
      id: customer.id,
      body: null,
    });

    const customerUpdated = await customerRepository.findById(customer.id);
    expect(customerUpdated.fullName).toEqual('Mateus Garcia');

    await updateCustomer.run({
      id: customer.id,
      body: {},
    });

    const customerUpdated2 = await customerRepository.findById(customer.id);
    expect(customerUpdated2.fullName).toEqual('Mateus Garcia');
  });

  it('should not be able to update customer by non-existent id!', async () => {
    const customerOrError = await updateCustomer.run({
      id: v4(),
      body: {},
    });

    const customerOrError2 = await updateCustomer.run({
      id: undefined,
      body: {},
    });

    const customerOrError3 = await updateCustomer.run({
      id: null,
      body: {},
    });

    const customerOrError4 = await updateCustomer.run({
      id: '',
      body: {},
    });

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
