import { ShowCity } from '@application/cities/ShowCity';
import { CityNotFoundError } from '@application/customers/errors';
import { container } from 'tsyringe';

import { AppException } from '@shared/exceptions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, ok, HttpResponse } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class ShowCityController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    const showCity = container.resolve(ShowCity);

    try {
      const city = await showCity.run(id);

      if (city.isError) {
        const error = city.value;

        switch (error.constructor) {
          case CityNotFoundError:
            throw AppException.build(
              error,
              HttpStatusCodes.STATUS_CODE_NOT_FOUND,
            );

          default:
            throw AppException.build(
              error,
              HttpStatusCodes.STATUS_CODE_BAD_REQUEST,
            );
        }
      }

      return ok(city.value);
    } catch (error) {
      return exception(error);
    }
  }
}

export { ShowCityController };
