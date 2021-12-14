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
  },

  async render() {
    return `
    <hero-elm></hero-elm>
    <section class="content latest">
        <div class="head-section">
            <h2 class="align__header">Proses UKBM</h2>
        </div>
        <ukbm-list class="posts">
            <ukbm-item-skeleton></ukbm-item-skeleton>
        </ukbm-list>
    </section>
      `;
  },

  async afterRender() {
    await this.init();
    await this.loadTicket();
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadTicket() {
    const listData = await DataSource.historiTicket();
    if (listData) {
      await this.showDataToList(listData, 'Problem loaded data, try again later');
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async showDataToList(data, error) {
    try {
      this.ukbmListElement.list = data;
    } catch {
      this.ukbmListElement.renderError(error);
    }
  },

};

export default Home;
