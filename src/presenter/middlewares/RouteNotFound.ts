import { NextFunction, Request, Response } from 'express';

import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class RouteNotFound {
  static handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Response {
    return response.status(HttpStatusCodes.STATUS_CODE_NOT_FOUND).json({
      status: 'Exception!',
      name: 'RouteNotFound',
      message: 'This API route does not exists!',
    });
  }
}

export { RouteNotFound };
