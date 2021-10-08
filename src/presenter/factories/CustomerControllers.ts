import { ListCustomerController } from '@presenter/controllers/ListCustomerController';
import { RegisterCustomerController } from '@presenter/controllers/RegisterCustomerController';
import { RemoveCustomerController } from '@presenter/controllers/RemoveCustomerController';
import { ShowCustomerController } from '@presenter/controllers/ShowCustomerController';
import { UpdateCustomerController } from '@presenter/controllers/UpdateCustomerController';

const registerCustomerController = new RegisterCustomerController();
const listCustomerController = new ListCustomerController();
const showCustomerController = new ShowCustomerController();
const removeCustomerController = new RemoveCustomerController();
const updateCustomerController = new UpdateCustomerController();

export {
  registerCustomerController,
  listCustomerController,
  showCustomerController,
  removeCustomerController,
  updateCustomerController,
};
