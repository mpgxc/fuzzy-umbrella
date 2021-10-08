import { ListCustomerController } from '@presenter/controllers/ListCustomerController';
import { RegisterCustomerController } from '@presenter/controllers/RegisterCustomerController';
import { ShowCustomerController } from '@presenter/controllers/ShowCustomerController';

const registerCustomerController = new RegisterCustomerController();
const listCustomerController = new ListCustomerController();
const showCustomerController = new ShowCustomerController();

export {
  registerCustomerController,
  listCustomerController,
  showCustomerController,
};
