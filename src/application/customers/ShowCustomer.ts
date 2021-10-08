import {
  CustomerRender,
  ICustomerRepository,
} from '@domain/customers/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/excpetions';

import { CustomerNotFoundError } from './errors';

type ShowCustomerResponse = Either<CustomerRender, CustomerNotFoundError>;

@injectable()
class ShowCustomer {
  constructor(
    @inject(ContainerRegisterAlias.CustomersRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async run(id: string): Promise<ShowCustomerResponse> {
    const customer = await this.customerRepository.findByIdRender(id);

    if (!customer) {
      return Result.Failure(new CustomerNotFoundError(id));
    }

    return Result.Success(customer);
  }
}

export { ShowCustomer };
