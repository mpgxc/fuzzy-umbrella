import { CelebrateAdapter } from '@infra/http/adapters/CelebrateAdapter/CelebrateAdapter';
import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import {
  listCustomerController,
  registerCustomerController,
  removeCustomerController,
  showCustomerController,
} from '@presenter/factories/CustomerControllers';
import { CustomerValidator } from '@presenter/validators/CustomerValidator';
import { Router } from 'express';

const customersRouter = Router();

customersRouter.post(
  '/',
  CelebrateAdapter.apply(CustomerValidator.BODY),
  ExpressAdapter.apply(registerCustomerController.handle),
);

customersRouter.get(
  '/',
  CelebrateAdapter.apply(CustomerValidator.QUERY),
  ExpressAdapter.apply(listCustomerController.handle),
);

customersRouter.get(
  '/:id',
  CelebrateAdapter.apply(CustomerValidator.PARAM),
  ExpressAdapter.apply(showCustomerController.handle),
);

customersRouter.delete(
  '/:id',
  CelebrateAdapter.apply(CustomerValidator.PARAM),
  ExpressAdapter.apply(removeCustomerController.handle),
);

export { customersRouter };
