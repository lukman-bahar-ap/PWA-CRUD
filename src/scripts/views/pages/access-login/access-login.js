import './style/login.scss';
import './component/login-form';
import '../../components/notif-green-elm';
import FormElement from '../../../utils/form-element';
import DiginasIdb from '../../../data/diginas-idb';
import AuthSource from '../../../data/auth-source';

const AccessLogin = {
  async init() {
    // this.appbar = document.querySelector('.appbar');
    this.togglePassword = document.querySelector('#togglePassword');
    this.inputNisn = document.querySelector('#reqNisn');
    this.inputPassword = document.querySelector('#reqPassword');
    this.btnLogin = document.querySelector('#btnLogin');
    this.notifElement = document.querySelector('notif-green-elm');
    // const bodyDocument = document.querySelector('#body-container');
    // bodyDocument.classList.add('body-background');
  },

  async render() {
    return `
    <login-form></login-form>
    <notif-green-elm></notif-green-elm>`;
  },

  async afterRender() {
    await this.init();

    // klick button eye on input password
    const eyeVisibility = { inputElm: this.inputPassword, eyeElm: this.togglePassword };
    this.togglePassword.addEventListener('click', async () => {
      FormElement._eyeVisibility(eyeVisibility);
    });

    // klick login button
    this.btnLogin.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.submitBtnLogin();
    });
  },

  async submitBtnLogin() {
    this.disableInput(true);
    if (this.isRequiered()) {
      const loginButtonPresenter = await import('./utility/login-btn-presenter')
        .then((module) => module.default)
        .then((LoginButtonPresenter) => LoginButtonPresenter)
        .catch((error) => new Error(error));

      await loginButtonPresenter.init({
        mode: 'login',
        nisn: this.inputNisn.value,
        password: this.inputPassword.value,
        idb: DiginasIdb,
        authSource: AuthSource,
        notif: this.notifElement,
      });
      return this.clearInput();
    }
    return this.notifElement.notif = 'NISN dan Password harus terisi';
  },

  isRequiered() {
    return !(this.inputNisn.value === '' || this.inputPassword.value === '');
  },

  clearInput() {
    this.inputNisn.value = '';
    this.inputPassword.value = '';
    this.disableInput(false);
  },

  disableInput(b) {
    this.inputNisn.disabled = b;
    this.inputPassword.disabled = b;
    this.btnLogin.disabled = b;
  },

};

export default AccessLogin;
