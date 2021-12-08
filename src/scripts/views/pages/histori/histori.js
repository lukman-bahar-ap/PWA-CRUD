import './component/histori-list';
import addToList from '../../../utils/add-to-list';
import DataSource from '../../../data/data-source';

const Histori = {
  async init() {
    this.historiListElement = document.querySelector('histori-list');
    this.mainContent = document.querySelector('#main-content');
    const akademik = await DataSource.getAkademikFromDb();
    this.KKM = akademik.kkm;
  },
  async render() {
    return `
    <div class="timelinepage">
      <section class="timeline">
        <histori-list></histori-list>  
      </section>
    </div>`;
  },

  async afterRender() {
    await this.init();
    await this.loadHistory();
    // this.appbar.classList.add('scrolled');
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadHistory() {
    const nilai = await DataSource.histori();
    if (nilai) {
      const content = {
        data: { nilai, kkm: this.KKM },
        error: 'Problem loaded data, try again later',
        element: this.historiListElement,
      };
      await addToList.init(content);
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

};

export default Histori;
