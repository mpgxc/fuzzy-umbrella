import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import { Router } from 'express';
import { registerCustomerController } from 'presenter/factories/CustomerControllers';

const customersRouter = Router();

customersRouter.post(
  '/',
  ExpressAdapter.apply(registerCustomerController.handle),
);

export { customersRouter };
