import { IBaseRepository } from '@domain/common/IBaseRepository';

import { Customer } from './Customer';
import { RenderCustomerResponse } from './CustomerMapper';

type CustomerRender = Partial<RenderCustomerResponse>;

interface ICustomerRepository
  extends IBaseRepository<Customer, CustomerRender> {
  listByName(name: string): Promise<CustomerRender[]>;
}

export { ICustomerRepository, CustomerRender };
