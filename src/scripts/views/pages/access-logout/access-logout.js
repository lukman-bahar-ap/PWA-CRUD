import './component/change-pass-form';

const ChangePass = {
  async init() {
    // this.appbar = document.querySelector('.appbar');
  },
  async render() {
    return `
    <password-form></password-form>
      `;
  },

  async afterRender() {
    // await this.init();
    // this.appbar.classList.add('scrolled');
  },

};

export default ChangePass;
