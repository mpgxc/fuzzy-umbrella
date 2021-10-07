import { Customer } from './Customer';
import { RenderCustomerResponse } from './CustomerMapper';

type CustomerRender = Partial<RenderCustomerResponse>;

interface ICustomerRepository {
  create(customer: Customer, city_id: string): Promise<void>;
  save(customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<Customer>;
  listByName(name: string): Promise<CustomerRender[]>;
  list(name?: string): Promise<CustomerRender[]>;
}

export { ICustomerRepository, CustomerRender };
