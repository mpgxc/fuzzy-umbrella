import { Customer } from './Customer';

interface ICustomerRepository {
  create(customer: Customer, city_id: string): Promise<void>;
  save(customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;

  findById(id: string): Promise<Customer>;
  listByName(name: string): Promise<Customer[]>;
  list(): Promise<Customer[]>;
}

export { ICustomerRepository };
