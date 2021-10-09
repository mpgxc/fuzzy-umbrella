import { ListCity } from '@application/cities/ListCity';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/http/BaseController';
import { HttpRequest } from '@shared/http/HttpRequest';
import { exception, ok, HttpResponse } from '@shared/http/HttpResponse';

class ListCityController implements IBaseController {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { state, city } = request.query;

    const showCity = container.resolve(ListCity);

    try {
      const cities = await showCity.run({
        state,
        city,
      });

      return ok(cities);
    } catch (error) {
      return exception(error);
    }
  }
}

export { ListCityController };
