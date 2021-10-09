import { BaseAppException } from '@shared/exceptions';

class CityNotFoundError extends BaseAppException {
  constructor(value: string) {
    super();
    this.message = `The City <${value}> does not exists!`;
    this.name = 'CityNotFoundError';
  }
}

export { CityNotFoundError };
