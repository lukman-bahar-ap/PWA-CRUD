import './style/form-grid.scss';
import './component/profil-list';
import './component/tab-pd-form';
import DataSource from '../../../data/data-source';
import addToList from '../../../utils/add-to-list';
import DiginasIdb from '../../../data/diginas-idb';

const Profil = {
  async init() {
    this.profilListElement = document.querySelector('profil-list');

    this.btnPersonal = document.querySelector('#btnPersonal');
    this.btnImunisasi = document.querySelector('#btnImunisasi');
    this.btnKeluarga = document.querySelector('#btnKeluarga');
    this.btnSekolahSebelumnya = document.querySelector('#btnSekolahSebelumnya');
    this.btnTmptTinggal = document.querySelector('#btnTmptTinggal');
  },
  async render() {
    return `
    <section class="content latest">
      <tab-card></tab-card>
      <profil-list></profil-list>
    </section> 
      `;
  },

  async afterRender() {
    await this.init();
    await this.loadContent('1');
    this._tabButton();
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadContent(tabMenu) {
    const listData = await DataSource.profil(tabMenu);
    if (listData) {
      const content = {
        data: listData,
        error: 'Problem loaded data, try again later',
        element: this.profilListElement,
      };
      // await DiginasIdb.clearProfil();
      await addToList.init(content);
      if (!listData.NODATA) {
        await DiginasIdb.putProfilMultiple(listData);
      }
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  _tabButton() {
    this.btnPersonal.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.loadContent('personal');
    });
    this.btnImunisasi.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.loadContent('imunisasi');
    });
    this.btnKeluarga.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.loadContent('keluarga');
    });
    this.btnSekolahSebelumnya.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.loadContent('sekolah-sebelumnya');
    });
    this.btnTmptTinggal.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.loadContent('tmpt-tinggal');
    });
  },
};

export default Profil;
