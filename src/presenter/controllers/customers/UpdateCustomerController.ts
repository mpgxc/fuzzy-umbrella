import { CustomerNotFoundError } from '@application/customers/errors';
import { UpdateCustomer } from '@application/customers/UpdateCustomer';
import { container } from 'tsyringe';

import { AppException } from '@shared/exceptions';
import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, HttpResponse, ok } from '@shared/http/HttpResponse';
import { HttpStatusCodes } from '@shared/http/HttpStatusCodes';

class UpdateCustomerController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const updateCustomer = container.resolve(UpdateCustomer);

    const { id } = request.params;
    const { full_name } = request.body;

    try {
      const customerUpdated = await updateCustomer.run({
        id,
        body: {
          full_name,
        },
      });

      if (customerUpdated.isError) {
        const error = customerUpdated.value;

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

      return ok();
    } catch (error) {
      return exception(error);
    }
  }
}

export { UpdateCustomerController };
