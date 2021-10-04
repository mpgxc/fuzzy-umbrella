import { BaseAppException } from '@shared/excpetions';

class CityAlreadyExistsError extends BaseAppException {
  constructor(value: string) {
    super();
    this.message = `The City <${value}> already exists!`;
    this.name = 'CityAlreadyExistsError';
  }
}

export { CityAlreadyExistsError };
