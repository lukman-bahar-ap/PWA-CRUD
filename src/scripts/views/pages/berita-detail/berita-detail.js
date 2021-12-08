import './component/detail-berita';
import UrlParser from '../../../routes/url-parser';
import DataSource from '../../../data/data-source';

const Detail = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = url.id;

    this.beritaElement = document.querySelector('detail-berita');
    this.btnClose = document.querySelector('#previousPage');
  },
  async render() {
    return `
        <section class="content">
          <h2 class="detail__title">
            <a href="#" id="previousPage" aria-label="back to previeus page"
            accesskey="b" class="back-button">
              <i class="large material-icons">keyboard_backspace</i>
            </a>
            Detail Berita
          </h2>
          <detail-berita></detail-berita>
          <div id="likeButtonContainer"></div>
        </section>
      `;
  },

  async afterRender() {
    await this.init();
    await this.isLoaded();
  },

  async loadDatailResto(berita) {
    this.beritaElement.detail = berita;
    this.btnClose.addEventListener('click', () => {
      window.history.go(-1);
    });
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async isLoaded() {
    const data = await this.getFromSource(this.id);
    if (data) {
      await this.loadDatailResto(data);
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" 
      src="${IMG.CIRCLE}" alt="connection error, try again later" class="lazyload">`;
    }
  },

  async getFromSource(id) {
    try {
      const resto = await DataSource.beritaDetail(id);
      return resto;
    } catch {
      return false;
    }
  },
};

export default Detail;
