import { ListCustomer } from '@application/customers/ListCustomer';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, HttpResponse, ok } from '@shared/http/HttpResponse';

class ListCustomerController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const listCustomer = container.resolve(ListCustomer);
    const { name } = request.query;

    try {
      const customers = await listCustomer.run(name);

      return ok(customers);
    } catch (error) {
      return exception(error);
    }
  }
}

export { ListCustomerController };
