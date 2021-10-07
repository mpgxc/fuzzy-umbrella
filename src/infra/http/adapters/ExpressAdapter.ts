import { Request, Response } from 'express';

import { HttpRequest } from '@shared/http/HttpRequest';

type ControllerReponse = {
  (request: HttpRequest);
};

class ExpressAdapter {
  static apply(CtxController: ControllerReponse) {
    return async (request: Request, response: Response): Promise<Response> => {
      const httpResponse = await CtxController(request as HttpRequest);
      /**
       * Success status code range: 200 - 299
       * Error/Others: < 200 or > 299
       */
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return response.status(httpResponse.statusCode).json(httpResponse.body);
      }

      return response
        .status(httpResponse.statusCode)
        .json({ ...httpResponse.body });
    };
  }
}

export { ExpressAdapter };
