import { Customer } from '@domain/customers/Customer';
import { CustomerMapper } from '@domain/customers/CustomerMapper';
import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/excpetions';

import { CustomerNotFoundError } from './errors';

type UpdateCustomerResponse = Either<null, CustomerNotFoundError>;

type UpdateCustomerRequest = {
  id: string;
  body: {
    full_name?: string;
  };
};

@injectable()
class UpdateCustomer {
  constructor(
    @inject(ContainerRegisterAlias.CustomersRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async run({
    id,
    body,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      return Result.Failure(new CustomerNotFoundError(id));
    }

    const customerProps = CustomerMapper.toPersistence(customer);

    const updatedCustomer = Customer.build(
      {
        ...customerProps,
        ...body,
      },
      id,
    );

    await this.customerRepository.save(updatedCustomer);

    return Result.Success(null);
  }
}

export { UpdateCustomer };
