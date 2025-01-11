import { CelebrateMapper } from '@infra/http/adapters/CelebrateAdapter/CelebrateMapper';
import { CelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';

import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class CelebrateExceptionHandler {
  static handle(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (err instanceof CelebrateError) {
      const CelebratePropsErrors: Record<string, ValidationError> = {};
      let contextErrorKey: string;

      err.details.forEach((value, key) => {
        CelebratePropsErrors[key] = value;
        contextErrorKey = key;
      });

      const responseMessages = CelebrateMapper.renderMany(
        CelebratePropsErrors[contextErrorKey].details,
      );

      response
        .status(HttpStatusCodes.STATUS_CODE_UUNPROCESSABLE_ENTITY)
        .json(responseMessages);
    }

    next();
  }
}

export { CelebrateExceptionHandler };
