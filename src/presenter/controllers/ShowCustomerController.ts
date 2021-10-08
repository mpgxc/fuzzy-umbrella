import { CustomerNotFoundError } from '@application/customers/errors';
import { ShowCustomer } from '@application/customers/ShowCustomer';
import { container } from 'tsyringe';

import { AppException } from '@shared/excpetions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, HttpResponse, ok } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class ShowCustomerController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const showCustomer = container.resolve(ShowCustomer);
    const { id } = request.params;

    try {
      const customer = await showCustomer.run(id);

      if (customer.isError) {
        const error = customer.value;

        switch (error.constructor) {
          case CustomerNotFoundError:
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

      return ok(customer.value);
    } catch (error) {
      return exception(error);
    }
  }
}

export { ShowCustomerController };
