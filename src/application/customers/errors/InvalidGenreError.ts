import { BaseAppException } from '@shared/exceptions';

class InvalidGenreError extends BaseAppException {
  constructor(value: string) {
    super();
    this.message = `The Genre <${value}> does not exists! Only accepted <MALE and FEMALE>`;
    this.name = 'InvalidGenreError';
  }
}

export { InvalidGenreError };
