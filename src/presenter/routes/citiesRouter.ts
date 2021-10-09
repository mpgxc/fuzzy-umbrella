import { CelebrateAdapter } from '@infra/http/adapters/CelebrateAdapter/CelebrateAdapter';
import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import {
  registerCityController,
  showCityController,
} from '@presenter/factories/CityController';
import { CityValidator } from '@presenter/validators/CityValidator';
import { Router } from 'express';

const citiesRouter = Router();

citiesRouter.post(
  '/',
  CelebrateAdapter.apply(CityValidator.BODY),
  ExpressAdapter.apply(registerCityController.handle),
);

citiesRouter.get(
  '/:id',
  CelebrateAdapter.apply(CityValidator.PARAM),
  ExpressAdapter.apply(showCityController.handle),
);

export { citiesRouter };
