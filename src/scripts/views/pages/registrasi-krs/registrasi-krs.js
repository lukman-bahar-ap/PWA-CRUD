import './style/krs.scss';
import '../../components/bottom-submit';
import './component/krs-list';
import './component/krs-head';
import DiginasIdb from '../../../data/diginas-idb';
import DataSource from '../../../data/data-source';
import addToList from '../../../utils/add-to-list';
import launchToast from '../../../utils/toast';
import spaHelper from '../../../utils/page-helper';

const RegistrasiKrs = {
  async init() {
    // this.appbar = document.querySelector('.appbar');
    this.krsListElement = document.querySelector('krs-list');
    this.krsHeadElement = document.querySelector('krs-head');
    this.btnSubmitElement = document.querySelector('bottom-submit');
    this.btnSubmitElement.buttonName = 'Registrasi KRS';

    // tidak perlu import bottomNav dan appbar karena udh di impor di main
    this.bottomNavElement = document.querySelector('bottom-nav');
    this.bottomNavElement.unRender();

    this.appBarElement = document.querySelector('app-bar');
    this.appBarElement.headerClose = 'Registrasi KRS';
    this.btnCloseElement = document.querySelector('#close-page');
  },

  async render() {
    return `
    <krs-head></krs-head>
    <section class="content">
      <krs-list class="posts">
        <ukbm-item-skeleton></ukbm-item-skeleton>
      </krs-list>
    </section>
    <bottom-submit></bottom-submit>`;
  },

  async afterRender() {
    await this.init();
    const akademik = await DiginasIdb.getAkademik();
    if (akademik) {
      // load krs form
      await this.loadContent(akademik);

      // klick register button
      this.btnSubmitElement.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.submitBtnRegister(akademik[0].PESERTA_DIDIK_KRS_ID);
      });
      // klick close button
      this.btnCloseElement.addEventListener('click', async (e) => {
        e.preventDefault();
        // window.location.replace('#/home');
        // // tampilkan kembali appbar dan bottom
        // this.appBarElement.render();
        // this.bottomNavElement.render();
        spaHelper.summon({ page: '/home', showAppbar: 1, showBottomNav: 1 });
      });
    }
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadContent(akademik) {
    // request profil data (terutama id siswa dan id KRS)
    const data = await DataSource.formKrs({
      id: akademik[0].PESERTA_DIDIK_ID,
      krsId: akademik[0].KRS_MASTER_ID,
    });

    if (data) {
      // load kolom header
      const HEADER_FORM = {
        nama: akademik[0].NAMA,
        nisn: akademik[0].NISN,
        kelas: akademik[0].KELAS,
        tahunMasuk: data[0].TAHUN_MASUK,
        tahunAjar: data[0].TAHUN_AJAR,
        semester: data[0].SEMESTER,
      };
      this.krsHeadElement.head = HEADER_FORM;

      // load ukbm list
      const content = {
        data: data[0].UKBM,
        error: 'Problem loaded data, try again later',
        element: this.krsListElement,
      };
      await addToList.init(content);
    } else {
      const IMG = await this.loadImg();
      this.krsListElement.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async submitBtnRegister(krs) {
    const registerButtonPresenter = await import('./utility/register-btn-presenter')
      .then((module) => module.default)
      .then((RegisterButtonPresenter) => RegisterButtonPresenter)
      .catch((error) => new Error(error));

    await registerButtonPresenter.init({
      mode: 'register',
      krs,
      dataSource: DataSource,
      notif: launchToast,
      navigation: spaHelper,
    });
  },
};

export default RegistrasiKrs;
