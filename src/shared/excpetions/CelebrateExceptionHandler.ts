import { CelebrateMapper } from '@infra/http/adapters/CelebrateAdapter/CelebrateMapper';
import { CelebrateError } from 'celebrate';
import { Response, Request, NextFunction } from 'express';

import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

type ValidationCelebrateErrors = {
  [key: string]: any;
};

class CelebrateExceptionHandler {
  static handle(
    err: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response | void {
    if (err instanceof CelebrateError) {
      const CelebratePropsErrors: ValidationCelebrateErrors = new Map();
      let contextErrorKey: string;

      err.details.forEach((value, key) => {
        CelebratePropsErrors[key] = value;
        contextErrorKey = key;
      });

      return response
        .status(HttpStatusCodes.STATUS_CODE_UUNPROCESSABLE_ENTITY)
        .json(
          CelebrateMapper.renderMany(
            CelebratePropsErrors[contextErrorKey].details,
          ),
        );
    }

    return next();
  }
}

export { CelebrateExceptionHandler };
