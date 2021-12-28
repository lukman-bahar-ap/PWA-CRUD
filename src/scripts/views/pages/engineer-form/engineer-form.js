import '../access-login/style/login.scss';
import './component/update-ticket-form';
import '../../components/field-loop-list';
import DataSource from '../../../data/data-source';
import launchToast from '../../../utils/toast';
import UrlParser from '../../../routes/url-parser';

const EngineerForm = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = (url.id).toUpperCase();
    this.fieldLoop = document.querySelector('field-loop-list');
    this.inputStatus = document.querySelector('#reqStatus');
    this.inputNoted = document.querySelector('#reqNoted');
    this.ticketNumber = document.querySelector('#reqNoTicket');
    this.btnSubmit = document.querySelector('#btnSubmit');
    this.ticketNumber.value = this.id;

    const detailTicket = await DataSource.detailTicketIT(this.id);
    this.IdSubKategori = detailTicket.IdSubKategori;
    this.IdJenisPengaduan = detailTicket.IdJenisPengaduan;
    this.IdKategori = detailTicket.IdKategori;
    this.IdTicket = detailTicket.IdTicket;
    this.status = detailTicket.Status;
    this.list = detailTicket.list;

    this.inputStatus.value = this.status;
  },

  async render() {
    return `
    <update-ticket-form></update-ticket-form>
    <field-loop-list></field-loop-list>
      `;
  },

  async afterRender() {
    await this.init();
    this.fieldLoop.list = this.list;

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
      const updateButtonPresenter = await import('./utility/update-btn-presenter')
        .then((module) => module.default)
        .then((UpdateButtonPresenter) => UpdateButtonPresenter)
        .catch((error) => new Error(error));

      await updateButtonPresenter.init({
        mode: 'update',
        status: this.inputStatus.value,
        noted: this.inputNoted.value,
        id: this.id,
        IdTicket: this.IdTicket,
        IdKategori: this.IdKategori,
        IdSubKategori: this.IdSubKategori,
        IdJenisPengaduan: this.IdJenisPengaduan,
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

export default EngineerForm;
