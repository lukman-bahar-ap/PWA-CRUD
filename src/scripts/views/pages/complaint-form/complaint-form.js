import '../access-login/style/login.scss';
import './component/create-ticket-form';
import DataSource from '../../../data/data-source';
import launchToast from '../../../utils/toast';

const ComplaintForm = {
  async init() {
    this.inputSN = document.querySelector('#reqSN');
    this.inputLocation = document.querySelector('#reqLocation');
    this.inputComplaint = document.querySelector('#reqComplaint');
    this.btnSubmit = document.querySelector('#btnSubmit');
  },

  async render() {
    return `
    <create-ticket-form></create-ticket-form>
      `;
  },

  async afterRender() {
    await this.init();

    this.inputSN.addEventListener('blur', async () => {
      // FormElement._eyeVisibility(eyeCurrPass);
    });

    // klick login button
    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.submitBtnComplaintForm();
    });
  },

  async submitBtnComplaintForm() {
    if (this.isRequiered()) {
      const complaintButtonPresenter = await import('./utility/complaint-btn-presenter')
        .then((module) => module.default)
        .then((ComplaintFormButtonPresenter) => ComplaintFormButtonPresenter)
        .catch((error) => new Error(error));

      await complaintButtonPresenter.init({
        mode: 'insert',
        sn: this.inputSN.value,
        location: this.inputLocation.value,
        complaint: this.inputComplaint.value,
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
    return !(this.inputSN.value === ''
    || this.inputLocation.value === ''
    || this.inputComplaint.value === '');
  },

  clearInput() {
    this.inputSN.value = '';
    this.inputLocation.value = '';
    this.inputComplaint.value = '';
  },

  showNotif(toast) {
    const { icon, msg } = toast;
    return launchToast.init({ icon, msg });
  },

};

export default ComplaintForm;
