import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

interface IBaseController {
  handle(request?: HttpRequest): Promise<HttpResponse>;
}

export { IBaseController };
