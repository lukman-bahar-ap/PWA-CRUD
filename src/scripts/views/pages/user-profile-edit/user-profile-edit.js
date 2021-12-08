import './component/form-profil-item';
import DataSource from '../../../data/data-source';
import UrlParser from '../../../routes/url-parser';
import DiginasIdb from '../../../data/diginas-idb';
import launchToast from '../../../utils/toast';
import spaHelper from '../../../utils/page-helper';

const UserProfileEdit = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.fieldSelected = url.id;

    this.profilFormElement = document.querySelector('form-profil-item');

    // tidak perlu import bottomNav dan appbar karena udh di impor di main
    this.bottomNavElement = document.querySelector('bottom-nav');
    this.bottomNavElement.unRender();

    this.appBarElement = document.querySelector('app-bar');
    this.appBarElement.headerClose = 'Penyesuaian Data';
    const appbar = document.querySelector('.appbar');
    appbar.classList.add('scrolled');
    this.btnCloseElement = document.querySelector('#close-page');
  },

  async render() {
    return `
    <section class="content latest">
      <form-profil-item></form-profil-item>
    </section> 
      `;
  },

  async afterRender() {
    await this.init();
    this._buttonClose();
    await this.loadForm(this.fieldSelected);
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadForm(fieldSelected) {
    const dataField = await DiginasIdb.getProfil(fieldSelected.toUpperCase());
    if (dataField) {
      this.profilFormElement.parcelForm = dataField;

      const btnPenyesuaian = document.querySelector('#btnPenyesuaian');
      btnPenyesuaian.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.submitBtnPenyesuaian(dataField);
      });
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async submitBtnPenyesuaian(data) {
    const penyesuaianButtonPresenter = await import('./utility/penyesuaian-btn-presenter')
      .then((module) => module.default)
      .then((PenyesuaianButtonPresenter) => PenyesuaianButtonPresenter)
      .catch((error) => new Error(error));

    await penyesuaianButtonPresenter.init({
      mode: 'insert',
      id: await this.getIdPesertaDidik(),
      data,
      edited: this.profilFormElement.value,
      dataSource: DataSource,
      notif: launchToast,
      navigation: spaHelper,
    });
  },

  async getNISNFromDb() {
    const data = await DiginasIdb.getAllUsers();
    /* ambil urutan req pertama karena isinya hanya 1 rec. */
    console.log(data[0].NISN);
    return data[0].NISN;
  },

  async getIdPesertaDidik() {
    const profil = await DataSource.getProfilFromDb();
    if (profil) {
      return profil.nisn;
    }
    return 0;
  },

  _buttonClose() {
  // klick close button
    this.btnCloseElement.addEventListener('click', async (e) => {
      e.preventDefault();
      spaHelper.summon({ page: '/home', showAppbar: 1, showBottomNav: 1 });
    });
  },

};

export default UserProfileEdit;
