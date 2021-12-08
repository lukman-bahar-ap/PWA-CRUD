import '../../components/ukbm-list';
import '../../components/nilai-list';
import UrlParser from '../../../routes/url-parser';
import DiginasIdb from '../../../data/diginas-idb';
import addToList from '../../../utils/add-to-list';

const UkbmDetail = {
  async init() {
    /* ambil nilai krsId dari url */
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.krsId = url.id;

    this.ukbmListElement = document.querySelector('ukbm-list');
    this.nilaiListElement = document.querySelector('nilai-list');
    this.mainContent = document.querySelector('#main-content');
    const akademik = await DiginasIdb.getAkademik();
    this.KKM = akademik[0].KKM;
  },
  async render() {
    return `
    <div class="timelinepage">
      <ukbm-list></ukbm-list>
      <section class="timeline">
        <nilai-list></nilai-list>  
      </section>
    </div>`;
  },

  async afterRender() {
    await this.init();
    /* load ukbm selected item */
    await this.loadMapel(this.krsId);
    /* load nilai and kd */
    await this.loadNilai(this.krsId);
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadMapel(KrsId) {
    const mapel = await DiginasIdb.getUkbm(KrsId);
    if (mapel) {
      const content = {
        data: mapel,
        error: 'Problem loaded data, try again later',
        element: this.ukbmListElement,
      };
      await addToList.init(content);
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

  async loadNilai(KrsId) {
    const nilai = await DiginasIdb.getNilaiFromKRsId(KrsId);
    if (nilai) {
      const content = {
        data: { nilai, kkm: this.KKM },
        error: 'Problem loaded data, try again later',
        element: this.nilaiListElement,
      };
      await addToList.init(content);
    } else {
      const IMG = await this.loadImg();
      this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },
};

export default UkbmDetail;
