import { ICityRepository } from '@domain/cities/ICityRepository';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import {
  MemoryCustomersRepository,
  MemoryCityRepository,
} from '@infra/database/repositories';
import { container } from 'tsyringe';

import { ContainerRegisterAlias } from './​​​​ContainerRegisterAlias';

container.registerSingleton<ICustomerRepository>(
  ContainerRegisterAlias.CustomersRepository,
  MemoryCustomersRepository,
);

container.registerSingleton<ICityRepository>(
  ContainerRegisterAlias.CityRepository,
  MemoryCityRepository,
);
