import { ListCityController } from '@presenter/controllers/cities/ListCityController';
import { RegisterCityController } from '@presenter/controllers/cities/RegisterCityController';
import { ShowCityController } from '@presenter/controllers/cities/ShowCityController';

const registerCityController = new RegisterCityController();
const showCityController = new ShowCityController();
const listCityController = new ListCityController();

export { registerCityController, showCityController, listCityController };
