import { CelebrateMapper } from '@infra/http/adapters/CelebrateAdapter/CelebrateMapper';
import { CelebrateError } from 'celebrate';
import { Response, Request, NextFunction } from 'express';
import { ValidationError } from 'joi';

import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class CelebrateExceptionHandler {
  static handle(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
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

      return response
        .status(HttpStatusCodes.STATUS_CODE_UUNPROCESSABLE_ENTITY)
        .json(responseMessages);
    }

    return next();
  }
}

export { CelebrateExceptionHandler };
