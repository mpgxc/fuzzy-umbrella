import { ListCustomerController } from '@presenter/controllers/customers/ListCustomerController';
import { RegisterCustomerController } from '@presenter/controllers/customers/RegisterCustomerController';
import { RemoveCustomerController } from '@presenter/controllers/customers/RemoveCustomerController';
import { ShowCustomerController } from '@presenter/controllers/customers/ShowCustomerController';
import { UpdateCustomerController } from '@presenter/controllers/customers/UpdateCustomerController';

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
