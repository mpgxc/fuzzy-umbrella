import { Router } from 'express';

import { citiesRouter } from './citiesRouter';
import { customersRouter } from './customersRouter';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/cities', citiesRouter);

export { routes };
