import '../access-login/style/login.scss';
import './component/password-form';
import FormElement from '../../../utils/form-element';
import DataSource from '../../../data/data-source';
import launchToast from '../../../utils/toast';

const ChangePass = {
  async init() {
    this.toggleCurrPassword = document.querySelector('#toggleCurrPassword');
    this.toggleNewPassword = document.querySelector('#toggleNewPassword');
    this.toggleRePassword = document.querySelector('#toggleRePassword');

    this.inputCurrPassword = document.querySelector('#reqCurrPassword');
    this.inputNewPassword = document.querySelector('#reqNewPassword');
    this.inputRePassword = document.querySelector('#reqRePassword');
    this.btnSubmit = document.querySelector('#btnSubmit');
  },

  async render() {
    return `
    <password-form></password-form>
      `;
  },

  async afterRender() {
    await this.init();

    // klick button eye on input current password
    const eyeCurrPass = { inputElm: this.inputCurrPassword, eyeElm: this.toggleCurrPassword };
    this.toggleCurrPassword.addEventListener('click', async () => {
      FormElement._eyeVisibility(eyeCurrPass);
    });

    // klick button eye on input new password
    const eyeNewPass = { inputElm: this.inputNewPassword, eyeElm: this.toggleNewPassword };
    this.toggleNewPassword.addEventListener('click', async () => {
      FormElement._eyeVisibility(eyeNewPass);
    });

    // klick button eye on input new password
    const eyeRePass = { inputElm: this.inputRePassword, eyeElm: this.toggleRePassword };
    this.toggleRePassword.addEventListener('click', async () => {
      FormElement._eyeVisibility(eyeRePass);
    });

    // klick login button
    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.submitBtnChangePass();
    });
  },

  async submitBtnChangePass() {
    if (this.isRequiered()) {
      const changePassButtonPresenter = await import('./utility/change-pass-btn-presenter')
        .then((module) => module.default)
        .then((ChangePassButtonPresenter) => ChangePassButtonPresenter)
        .catch((error) => new Error(error));

      await changePassButtonPresenter.init({
        mode: 'change-pass',
        password: this.inputNewPassword.value,
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
    return !(this.inputCurrPassword.value === ''
    || this.inputNewPassword.value === ''
    || this.inputRePassword.value === '');
  },

  clearInput() {
    this.inputCurrPassword.value = '';
    this.inputNewPassword.value = '';
    this.inputRePassword.value = '';
  },

  showNotif(toast) {
    const { icon, msg } = toast;
    return launchToast.init({ icon, msg });
  },

};

export default ChangePass;
