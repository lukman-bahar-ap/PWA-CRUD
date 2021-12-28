import './component/hero-elm';
import '../../components/ukbm-list';
import '../../components/ukbm-item-skeleton';
import '../../components/notif-red-elm';
import DataSource from '../../../data/data-source';

const Home = {
  async init() {
    this.ukbmListElement = document.querySelector('ukbm-list');
    this.mainContent = document.querySelector('#main-content');
    this.heroElement = document.querySelector('hero-elm');
    this.msgSpan = document.getElementById('msgSpan');

    const profil = await DataSource.getProfilFromDb();
    this.userId = await profil.userId;
    this.privellage = await profil.hk;
  },

  async render() {
    return `
    <hero-elm></hero-elm>
    <section class="content latest">
        <ukbm-list class="posts">
            <ukbm-item-skeleton></ukbm-item-skeleton>
        </ukbm-list>
    </section>
      `;
  },

  async afterRender() {
    await this.init();
    await this.loadTicket(this.privellage);
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadTicket(privellage) {
    const listData = await this.selectLoadMatchPrivellage(privellage);
    // console.table(listData);
    if (listData) {
      await this.showDataToList(listData, 'Problem loaded data, try again later');
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async selectLoadMatchPrivellage(privellage) {
    switch (privellage) {
      case '1': return DataSource.historiTicket(this.userId, this.privellage);
      case '2': return DataSource.openTicket(this.userId);
      default: return DataSource.statusTicket(this.userId);
    }
  },

  async showDataToList(data, error) {
    try {
      this.ukbmListElement.list = { data, hk: this.privellage };
    } catch {
      this.ukbmListElement.renderError(error);
    }
  },

};

export default Home;
