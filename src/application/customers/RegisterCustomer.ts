/* eslint-disable @typescript-eslint/naming-convention */
import { ICityRepository } from '@domain/cities/ICityRepository';
import { Customer, Genre } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/exceptions';

import { CityNotFoundError, InvalidGenreError } from './errors';

type RegisterCustomerRequest = {
  full_name: string;
  birth_date: Date;
  genre: Genre;
  city_id: string;
};

type RegisterCustomerResponse = Either<Customer, CityNotFoundError>;

@injectable()
class RegisterCustomer {
  constructor(
    @inject(ContainerRegisterAlias.CustomersRepository)
    private readonly customerRepository: ICustomerRepository,

    @inject(ContainerRegisterAlias.CityRepository)
    private readonly cityRepository: ICityRepository,
  ) {}

  async run({
    birth_date,
    full_name,
    genre,
    city_id,
  }: RegisterCustomerRequest): Promise<RegisterCustomerResponse> {
    const city = await this.cityRepository.findById(city_id);

    if (!city) {
      return Result.Failure(new CityNotFoundError(city_id));
    }

    if (!['FEMALE', 'MALE'].includes(genre)) {
      return Result.Failure(new InvalidGenreError(genre));
    }

    const customer = Customer.build({
      birth_date,
      full_name,
      genre,
    });

    await this.customerRepository.create(customer, city_id);

    return Result.Success(customer);
  }
}

export { RegisterCustomer, RegisterCustomerRequest };
