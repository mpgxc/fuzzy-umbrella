import 'reflect-metadata';
import { RegisterCustomer } from '@application/customers/RegisterCustomer';
import { City } from '@domain/cities/City';
import { ICityRepository } from '@domain/cities/ICityRepository';
import { Customer, Genre } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import {
  MemoryCityRepository,
  MemoryCustomersRepository,
} from '@infra/database/repositories';
import { v4 } from 'uuid';

import { BaseAppException } from '@shared/excpetions';

let registerCustomer: RegisterCustomer;
let customerRepository: ICustomerRepository;
let cityRepository: ICityRepository;

let city: City;

describe('UseCase - RegisterCustomer', () => {
  beforeAll(async () => {
    customerRepository = new MemoryCustomersRepository();
    cityRepository = new MemoryCityRepository();
    registerCustomer = new RegisterCustomer(customerRepository, cityRepository);

    city = City.build({
      country: 'Piauí',
      name: 'Teresina',
    });

    await cityRepository.create(city);
  });

  it('should be to register new customers!', async () => {
    const customerOrError = await registerCustomer.run({
      birth_date: new Date('01/01/2000'),
      full_name: 'John Doe',
      genre: 'MALE',
      city_id: city.id,
    });

    const customer = customerOrError.value as Customer;

    expect(await customerRepository.findById(customer.id)).toBeTruthy();
    expect(customerOrError.isError).toBe(false);
  });

  it('should not be to register new customers with wrong city_id !', async () => {
    const customerOrError = await registerCustomer.run({
      birth_date: new Date('01/01/2000'),
      full_name: 'John Doe',
      genre: 'MALE',
      city_id: v4(),
    });

    expect((customerOrError.value as BaseAppException).name).toEqual(
      'CityNotFoundError',
    );

    expect(customerOrError.isError).toBe(true);
  });

  it('should not be to register new customers with non-existent gender!', async () => {
    const customerOrError = await registerCustomer.run({
      birth_date: new Date('01/01/2000'),
      full_name: 'John Doe',
      genre: 'FEMALE_MALE' as Genre,
      city_id: city.id,
    });

    expect((customerOrError.value as BaseAppException).name).toEqual(
      'InvalidGenreError',
    );

    expect(customerOrError.isError).toBe(true);
  });
});
