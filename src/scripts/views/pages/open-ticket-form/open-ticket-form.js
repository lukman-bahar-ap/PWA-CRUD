import '../access-login/style/login.scss';
import './component/asignee-ticket-form';
import DataSource from '../../../data/data-source';
import launchToast from '../../../utils/toast';
import UrlParser from '../../../routes/url-parser';

const OpenTicketForm = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = url.id;
    this.inputStatus = document.querySelector('#reqStatus');
    this.inputNoted = document.querySelector('#reqNoted');
    this.ticketNumber = document.querySelector('#reqNoTicket');
    this.btnSubmit = document.querySelector('#btnSubmit');
    this.ticketNumber.value = this.id;
  },

  async render() {
    return `
    <asignee-ticket-form></asignee-ticket-form>
      `;
  },

  async afterRender() {
    await this.init();

    this.inputStatus.addEventListener('change', async () => {
      // FormElement._eyeVisibility(eyeCurrPass);
    });

    // klick login button
    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.submitBtnEngineerForm();
    });
  },

  async submitBtnEngineerForm() {
    if (this.isRequiered()) {
      const updateButtonPresenter = await import('./utility/asignee-btn-presenter')
        .then((module) => module.default)
        .then((UpdateButtonPresenter) => UpdateButtonPresenter)
        .catch((error) => new Error(error));

      await updateButtonPresenter.init({
        mode: 'update',
        status: this.inputStatus.value,
        noted: this.inputNoted.value,
        id: this.id,
        dataSource: DataSource,
        notif: this.showNotif,
      });
      return this.clearInput();
    }
    const toast = {
      icon: '<i class="material-icons pr-low">keyboard</i>',
      msg: 'all fill required',
    };
    return this.showNotif(toast);
  },

  isRequiered() {
    return !(this.inputStatus.value === '' || this.inputNoted.value === '');
  },

  clearInput() {
    this.inputStatus.value = '';
    this.inputNoted.value = '';
  },

  showNotif(toast) {
    const { icon, msg } = toast;
    return launchToast.init({ icon, msg });
  },

};

export default OpenTicketForm;
