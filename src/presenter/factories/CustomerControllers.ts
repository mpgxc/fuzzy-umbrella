import { ListCustomerController } from '@presenter/controllers/ListCustomerController';
import { RegisterCustomerController } from '@presenter/controllers/RegisterCustomerController';
import { RemoveCustomerController } from '@presenter/controllers/RemoveCustomerController';
import { ShowCustomerController } from '@presenter/controllers/ShowCustomerController';

const registerCustomerController = new RegisterCustomerController();
const listCustomerController = new ListCustomerController();
const showCustomerController = new ShowCustomerController();
const removeCustomerController = new RemoveCustomerController();

export {
  registerCustomerController,
  listCustomerController,
  showCustomerController,
  removeCustomerController,
};
