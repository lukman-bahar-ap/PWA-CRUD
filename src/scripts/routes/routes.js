// new
import Home from '../views/pages/home/home';
import AccessLogin from '../views/pages/access-login/access-login';
import ComplaintForm from '../views/pages/complaint-form/complaint-form';
import ChangePass from '../views/pages/change-pass/change-pass';
import EngineerForm from '../views/pages/engineer-form/engineer-form';
import HelpdeskForm from '../views/pages/helpdesk-form/helpdesk-form';
import OpenTicketForm from '../views/pages/open-ticket-form/open-ticket-form';
// old
import Ukbm from '../views/pages/ukbm/ukbm';

const Routes = {
  '/': Home,
  '/auth': AccessLogin,
  '/home': Home,
  '/changepass': ChangePass,
  '/ukbm': Ukbm,
  '/complaintform': ComplaintForm,
  '/engineer/:id': EngineerForm,
  '/helpdesk/:id': HelpdeskForm,
  '/open/:id': OpenTicketForm,
};

export default Routes;
