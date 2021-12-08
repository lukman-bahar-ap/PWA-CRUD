import './component/hero-elm';
import './component/dashboard-card';
import '../../components/berita-list';
import '../../components/ukbm-list';
import '../../components/ukbm-item-skeleton';
import '../../components/notif-red-elm';
import DataSource from '../../../data/data-source';
import DashboardPencapaian from './utility/dashboard-pencapaian';
import DiginasIdb from '../../../data/diginas-idb';

const Home = {
  async init() {
    this.dashboardElement = document.querySelector('dashboard-card');
    this.ukbmListElement = document.querySelector('ukbm-list');
    this.beritaListElement = document.querySelector('berita-list');
    this.mainContent = document.querySelector('#main-content');
    this.heroElement = document.querySelector('hero-elm');
    this.notifElement = document.querySelector('notif-red-elm');
    this.msgSpan = document.getElementById('msgSpan');
    /* clear ukbm because will renew it with fetch again */
    await DiginasIdb.clearUkbm();
    /* clear nilai kd from idb (detail for ukbm) because will renew */
    await DiginasIdb.clearNilai();
    await DiginasIdb.clearAkademik();
    await DiginasIdb.clearProfil();
  },

  async render() {
    return `
    <hero-elm></hero-elm>
      <notif-red-elm></notif-red-elm>
    <section class="content">
        <dashboard-card></dashboard-card>
    </section>
    <section class="content latest">
    <div class="head-section">
        <h2 class="align__header">Proses UKBM</h2>
        <div class="right__header">
          <a href="#/ukbm">Selengkapnya..</a>
        </div>
    </div>
        <ukbm-list class="posts">
            <ukbm-item-skeleton></ukbm-item-skeleton>
        </ukbm-list>
    </section>
    <section class="content latest">
        <h2 class="category__title">Berita</h2>
        <berita-list class="posts">
            <ukbm-item-skeleton></ukbm-item-skeleton>
        </berita-list>
    </section>
      `;
  },

  async afterRender() {
    await this.init();
    /* load 1. dashboard, 2.ukbm (save), 3.pencapaian (save) 4. berita */
    await this.loadContent();
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadContent() {
    // request profil data (terutama id siswa dan id KRS)
    const data = await DataSource.dashboard();
    if (data) {
      // simpan data di idb. krs_master_id dari sini akan dibutuhkan di history
      await DiginasIdb.putAkademik(data);

      const {
        PESERTA_DIDIK_ID, NAMA, NISN, KELAS, SEMESTER, PERSENTASE, REGISTERED, KRS_MASTER_ID, NOTIF,
      } = data;

      /* menampilkan info siswa dan dashboard keseluruhan krs pd element header */
      this.heroElement.dashboard = {
        name: NAMA,
        nisn: NISN,
        semester: SEMESTER,
        kelas: KELAS,
        presentage: PERSENTASE,
      };

      /* Jika siswa belum mendaftar krs maka tampilkan notif */
      if (REGISTERED === '0') {
        this.notifElement.notif = NOTIF;
        await this.krsRegistrationButton();
      }
      // load list ukbm
      await this.loadUkbm(PESERTA_DIDIK_ID, KRS_MASTER_ID);

      // load dashboard pencapaian
      await this.loadPencapaian(PESERTA_DIDIK_ID, KRS_MASTER_ID);

      // load notif
      await this.loadNewNotif();

      // load berita
      await this.loadBerita();
    } else {
      this.heroElement.dashboard = {
        name: 'gagal', nisn: 'memuat data', semester: 0, kelas: 0, presentage: 0,
      };
    }
  },

  async loadUkbm(id, KrsId) {
    const listData = await DataSource.ukbmDashboard(id, KrsId);
    if (listData) {
      /* save data to idb */
      await DiginasIdb.putMultipleUkbm(listData);
      await this.showUkbmToList(listData, 'Problem loaded data, try again later');
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async showUkbmToList(data, error) {
    try {
      this.ukbmListElement.list = data;
    } catch {
      this.ukbmListElement.renderError(error);
    }
  },

  async loadBerita() {
    const listData = await DataSource.berita();
    if (listData) {
      await this.showBeritaToList(listData, 'Problem loaded data, try again later');
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async loadNewNotif() {
    const listData = await DataSource.notifDashboard();
    if (listData) {
      const listNotif = await DiginasIdb.getAllNotif();
      const putMatchNotif = listData.filter((f) => !listNotif.includes(f));
      console.log(putMatchNotif);
      if (listData.length > 0 && putMatchNotif.length > 0) {
        this.msgSpan.classList.add('show-mobile-tab-only');
        this.msgSpan.classList.add('badge-notif');
      } else if (document.querySelector('.show-mobile-tab-only') !== null) {
        this.msgSpan.classList.remove('show-mobile-tab-only');
        this.msgSpan.classList.remove('badge-notif');
      }
    }
  },

  async showBeritaToList(data, error) {
    try {
      this.beritaListElement.news = data;
    } catch {
      this.beritaListElement.renderError(error);
    }
  },

  async loadPencapaian(id, KrsId) {
    const data = await DataSource.pencapaian(id, KrsId);
    if (data) {
      /* save data to idb */
      await DiginasIdb.putMultipleNilai(data);
      /* calculate data for pencapaian and then show  */
      const dataNilai = await DashboardPencapaian.calculate(data);
      this.dashboardElement.setDataDashboard = dataNilai;
    }
  },

  async krsRegistrationButton() {
    const register = async () => {
      location.href = '#/krs';
    };
    this.notifElement.clickEvent = register;
  },

};

export default Home;
