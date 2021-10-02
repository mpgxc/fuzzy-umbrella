import { CityNotFoundError } from '@application/customers/errors';
import {
  RegisterCustomer,
  RegisterCustomerRequest,
} from '@application/customers/RegisterCustomer';
import { container } from 'tsyringe';

import { AppException } from '@shared/excpetions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, created, HttpResponse } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class RegisterCustomerController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { birth_date, city_id, full_name, genre } =
      request.body as RegisterCustomerRequest;

    const registerCustomer = container.resolve(RegisterCustomer);

    try {
      const customerRegistered = await registerCustomer.run({
        birth_date,
        city_id,
        full_name,
        genre,
      });

      if (customerRegistered.isError) {
        const error = customerRegistered.value;

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

      return created(customerRegistered.value);
    } catch (error) {
      return exception(error);
    }
  }
}

export { RegisterCustomerController };
