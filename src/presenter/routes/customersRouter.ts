import { CelebrateAdapter } from '@infra/http/adapters/CelebrateAdapter/CelebrateAdapter';
import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import { registerCustomerController } from '@presenter/factories/CustomerControllers';
import { CustomerValidator } from '@presenter/validators/CustomerValidator';
import { Router } from 'express';

const customersRouter = Router();

customersRouter.post(
  '/',
  CelebrateAdapter.apply(CustomerValidator.BODY),
  ExpressAdapter.apply(registerCustomerController.handle),
);

export { customersRouter };
