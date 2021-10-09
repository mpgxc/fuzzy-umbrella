import { RegisterCityController } from '@presenter/controllers/cities/RegisterCityController';
import { ShowCityController } from '@presenter/controllers/cities/ShowCityController';

const registerCityController = new RegisterCityController();
const showCityController = new ShowCityController();

export { registerCityController, showCityController };
