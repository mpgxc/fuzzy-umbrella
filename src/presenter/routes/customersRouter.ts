import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import { registerCustomerController } from '@presenter/factories/CustomerControllers';
import { Router } from 'express';

const customersRouter = Router();

customersRouter.post(
  '/',
  ExpressAdapter.apply(registerCustomerController.handle),
);

export { customersRouter };
