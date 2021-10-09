/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import { Customer } from '@domain/customers/Customer';
import {
  CustomerRender,
  ICustomerRepository,
} from '@domain/customers/ICustomerRepository';
import { MemoryCustomersRepository } from '@infra/database/repositories';
import faker from 'faker';
import { v4 } from 'uuid';

import { BaseAppException } from '@shared/exceptions';

import { ShowCustomer } from '../ShowCustomer';

let showCustomer: ShowCustomer;
let customerRepository: ICustomerRepository;

describe('UseCase - ShowCustomer', () => {
  beforeEach(async () => {
    customerRepository = new MemoryCustomersRepository();
    showCustomer = new ShowCustomer(customerRepository);
  });

  it('should be able to find registered customers by id!', async () => {
    const customer = Customer.build({
      birth_date: faker.date.past(),
      full_name: 'Mateus Garcia',
      genre: faker.random.arrayElement(['MALE', 'FEMALE']),
    });

    await customerRepository.create(customer, '');

    const customerOrError = await showCustomer.run(customer.id);
    const customerFinded = customerOrError.value as CustomerRender;

    expect(customerOrError.isError).toBe(false);

    expect(customerFinded).toBeTruthy();
    expect(customerFinded.id).toBe(customer.id);
    expect(customerFinded.genre).toBe(customer.genre);
    expect(customerFinded.full_name).toBe(customer.fullName);
    expect(customerFinded.birth_date).toBe(customer.birthDate);
  });

  it('should not be able to find customers registered by non-existent id!', async () => {
    const customerOrError = await showCustomer.run(v4());
    const customerOrError2 = await showCustomer.run(undefined);
    const customerOrError3 = await showCustomer.run(null);
    const customerOrError4 = await showCustomer.run('');

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
