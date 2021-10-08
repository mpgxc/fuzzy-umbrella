import { BaseAppException } from '@shared/excpetions';

class CustomerNotFoundError extends BaseAppException {
  constructor(value: string) {
    super();
    this.message = `The Customer <${value}> does not exists!`;
    this.name = 'CustomerNotFoundError';
  }
}

export { CustomerNotFoundError };
