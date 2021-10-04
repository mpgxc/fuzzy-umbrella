import { Customer } from '@domain/customers/Customer';
import { CustomerMapper } from '@domain/customers/CustomerMapper';
import {
  CustomerRender,
  ICustomerRepository,
} from '@domain/customers/ICustomerRepository';
import { prisma } from '@infra/database/prisma';

class CustomerRepository implements ICustomerRepository {
  async create(customer: Customer, city_id: string): Promise<void> {
    await prisma.customer.create({
      data: {
        ...CustomerMapper.toPersistence(customer),
        city_id,
      },
    });
  }

  async save(customer: Customer): Promise<void> {
    await prisma.customer.update({
      where: {
        id: customer.id,
      },
      data: CustomerMapper.toPersistence(customer),
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Customer> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer ? CustomerMapper.toDomain(customer) : null;
  }

  async listByName(name: string): Promise<CustomerRender[]> {
    const customers = await prisma.customer.findMany({
      where: {
        full_name: {
          contains: name,
        },
      },
    });

    return customers.map(CustomerMapper.toRender);
  }

  async list(): Promise<CustomerRender[]> {
    const customers = await prisma.customer.findMany({
      include: {
        City: true,
      },
    });

    return customers.map(CustomerMapper.toRender);
  }
}

export { CustomerRepository };
