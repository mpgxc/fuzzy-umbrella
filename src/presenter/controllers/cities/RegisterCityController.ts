import { CityAlreadyExistsError } from '@application/cities/errors';
import {
  RegisterCity,
  RegisterCityRequest,
} from '@application/cities/RegisterCity';
import { container } from 'tsyringe';

import { AppException } from '@shared/excpetions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, created, HttpResponse } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class RegisterCityController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { country, name } = request.body as RegisterCityRequest;

    const registerCity = container.resolve(RegisterCity);

    try {
      const cityRegistered = await registerCity.run({
        country,
        name,
      });

      if (cityRegistered.isError) {
        const error = cityRegistered.value;

        switch (error.constructor) {
          case CityAlreadyExistsError:
            throw AppException.build(
              error,
              HttpStatusCodes.STATUS_CODE_CONFLICT,
            );

          default:
            throw AppException.build(
              error,
              HttpStatusCodes.STATUS_CODE_BAD_REQUEST,
            );
        }
      }

      return created();
    } catch (error) {
      return exception(error);
    }
  }
}

export { RegisterCityController };
