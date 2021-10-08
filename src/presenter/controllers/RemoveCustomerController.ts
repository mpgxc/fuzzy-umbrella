import { CustomerNotFoundError } from '@application/customers/errors';
import { RemoveCustomer } from '@application/customers/RemoveCustomer';
import { container } from 'tsyringe';

import { AppException } from '@shared/excpetions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, HttpResponse, removed } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class RemoveCustomerController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const removeCustomer = container.resolve(RemoveCustomer);
    const { id } = request.params;

    try {
      const customerRemoved = await removeCustomer.run(id);

      if (customerRemoved.isError) {
        const error = customerRemoved.value;

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

      return removed();
    } catch (error) {
      return exception(error);
    }
  }
}

export { RemoveCustomerController };
