import { Customer } from '@domain/customers/Customer';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';

class CustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  async create(customer: Customer, city_id: string): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: Customer): Promise<void> {
    const index = this.customers.findIndex(c => c.id === customer.id);
    this.customers[index] = customer;
  }

  async delete(id: string): Promise<void> {
    const index = this.customers.findIndex(c => c.id === id);
    this.customers.splice(index, 1);
  }

  async findById(id: string): Promise<Customer> {
    return this.customers.find(c => c.id === id);
  }

  async listByName(name: string): Promise<Customer[]> {
    return this.customers.filter(c => c.fullName === name);
  }

  async list(): Promise<Customer[]> {
    return this.customers;
  }
}

export { CustomersRepository };
