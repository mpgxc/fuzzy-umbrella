import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

import { BaseAppException } from '.';

class AppException extends Error {
  readonly name: string;
  readonly statusCode: number;

  private constructor(error: BaseAppException, statusCode?: number) {
    super(error.message);

    this.name = error.name;
    this.statusCode = statusCode;
  }

  static build(error: BaseAppException, statusCode?: number): AppException {
    return new this(
      error,
      statusCode || HttpStatusCodes.STATUS_CODE_BAD_REQUEST,
    );
  }
}

export { AppException };
