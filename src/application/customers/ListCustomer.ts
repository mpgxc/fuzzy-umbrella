import {
  CustomerRender,
  ICustomerRepository,
} from '@domain/customers/ICustomerRepository';
import { inject, injectable } from 'tsyringe';

import { ContainerRegisterAlias } from '@shared/container/​​​​ContainerRegisterAlias';

@injectable()
class ListCustomer {
  constructor(
    @inject(ContainerRegisterAlias.CustomersRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async run(name?: string): Promise<CustomerRender[]> {
    return this.customerRepository.list(name);
  }
}

export { ListCustomer };
