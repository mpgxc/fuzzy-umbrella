import { CelebrateAdapter } from '@infra/http/adapters/CelebrateAdapter/CelebrateAdapter';
import { ExpressAdapter } from '@infra/http/adapters/ExpressAdapter';
import { registerCityController } from '@presenter/factories/CityController';
import { CityValidator } from '@presenter/validators/CityValidator';
import { Router } from 'express';

const citiesRouter = Router();

citiesRouter.post(
  '/',
  CelebrateAdapter.apply(CityValidator.BODY),
  ExpressAdapter.apply(registerCityController.handle),
);

export { citiesRouter };
