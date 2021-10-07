import {
  Customer as PersistenceCustomer,
  City as PersistenceCity,
} from '@prisma/client';

import { Customer, Genre } from './Customer';

type CustomerPersistence = {
  id: string;
  full_name: string;
  genre: Genre;
  birth_date: Date;
};

type RenderCustomerResponse = PersistenceCustomer & {
  age: number;
  city: string;
  country: string;
};

type RenderCustomerRequest = PersistenceCustomer & {
  City?: PersistenceCity;
};

class CustomerMapper {
  private static calculateAge(birthDate: Date): number {
    const today = new Date().getFullYear();
    return today - birthDate.getFullYear();
  }

  public static toPersistence(customer: Customer): CustomerPersistence {
    return {
      id: customer.id,
      full_name: customer.fullName,
      genre: customer.genre,
      birth_date: customer.birthDate,
    };
  }

  public static toDomain(customer: CustomerPersistence): Customer {
    return Customer.build(
      {
        full_name: customer.full_name,
        birth_date: customer.birth_date,
        genre: customer.genre,
      },
      customer.id,
    );
  }

  static toRender(
    customer: RenderCustomerRequest,
  ): Partial<RenderCustomerResponse> {
    return {
      id: customer.id,
      full_name: customer.full_name,
      genre: customer.genre,
      birth_date: customer.birth_date,
      age: CustomerMapper.calculateAge(customer.birth_date),
      city: customer?.City?.name,
      country: customer?.City?.country,
      is_active: customer.is_active,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }
}

export { CustomerMapper, RenderCustomerResponse };
