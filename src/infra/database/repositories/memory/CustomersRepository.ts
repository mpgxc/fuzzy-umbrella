import { Customer } from '@domain/customers/Customer';
import {
  CustomerMapper,
  CustomerPersistence,
  RenderCustomerResponse,
} from '@domain/customers/CustomerMapper';
import {
  CustomerRender,
  ICustomerRepository,
} from '@domain/customers/ICustomerRepository';

class CustomersRepository implements ICustomerRepository {
  private customers: CustomerPersistence[] = [];

  async create(customer: Customer, city_id: string): Promise<void> {
    this.customers.push(CustomerMapper.toPersistence(customer));
  }

  async save(customer: Customer): Promise<void> {
    const index = this.customers.findIndex(c => c.id === customer.id);
    this.customers[index] = CustomerMapper.toPersistence(customer);
  }

  async delete(id: string): Promise<void> {
    const index = this.customers.findIndex(c => c.id === id);
    this.customers.splice(index, 1);
  }

  async findById(id: string): Promise<Customer> {
    const customer = this.customers.find(c => c.id === id);
    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async findByIdRender(id: string): Promise<CustomerRender> {
    const customer = this.customers.find(c => c.id === id);
    return customer
      ? CustomerMapper.toRender(customer as RenderCustomerResponse)
      : null;
  }

  async listByName(name: string): Promise<CustomerPersistence[]> {
    return this.customers.filter(c => c.full_name === name);
  }

  async list(name?: string): Promise<Partial<CustomerRender>[]> {
    if (name) {
      return this.customers
        .filter(c => c.full_name === name)
        .map(CustomerMapper.toRender);
    }

    return this.customers.map(CustomerMapper.toRender);
  }
}

export { CustomersRepository };
