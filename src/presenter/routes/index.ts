import { Router } from 'express';

import { customersRouter } from './customersRouter';

const routes = Router();

routes.use('/customers', customersRouter);

export { routes };
