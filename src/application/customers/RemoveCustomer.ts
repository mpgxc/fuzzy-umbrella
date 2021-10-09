import { ICustomerRepository } from '@domain/customers/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';
import { Either, Result } from '@shared/exceptions';

import { CustomerNotFoundError } from './errors';

type RemoveCustomerResponse = Either<null, CustomerNotFoundError>;

@injectable()
class RemoveCustomer {
  constructor(
    @inject(ContainerRegisterAlias.CustomersRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async run(id: string): Promise<RemoveCustomerResponse> {
    const customer = await this.customerRepository.findByIdRender(id);

    if (!customer) {
      return Result.Failure(new CustomerNotFoundError(id));
    }

    await this.customerRepository.delete(id);

    return Result.Success(null);
  }
}

export { RemoveCustomer };
