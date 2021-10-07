import { ListCustomerController } from '@presenter/controllers/ListCustomerController';
import { RegisterCustomerController } from '@presenter/controllers/RegisterCustomerController';

const registerCustomerController = new RegisterCustomerController();
const listCustomerController = new ListCustomerController();

export { registerCustomerController, listCustomerController };
