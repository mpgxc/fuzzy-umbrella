import { ICityRepository } from '@domain/cities/ICityRepository';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import {
  CityRepository,
  CustomerRepository,
} from '@infra/database/repositories';
import { container } from 'tsyringe';

import { ContainerRegisterAlias } from './​​​​ContainerRegisterAlias';

container.registerSingleton<ICustomerRepository>(
  ContainerRegisterAlias.CustomersRepository,
  CustomerRepository,
);

container.registerSingleton<ICityRepository>(
  ContainerRegisterAlias.CityRepository,
  CityRepository,
);
