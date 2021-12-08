import '../../components/search-bar';
import '../../components/ukbm-list';
import DiginasIdb from '../../../data/diginas-idb';
import DataSource from '../../../data/data-source';
// import addToList from '../../../utils/add-to-list';

const Ukbm = {
  async init() {
    this.searchElement = document.querySelector('search-bar');
    this.ukbmListElement = document.querySelector('ukbm-list');
    this.searchElement.headerTitle = 'Daftar UKBM';
    /* clear ukbm because will renew it with fetch again */
    await DiginasIdb.clearUkbm();
  },
  async render() {
    return `
    <section class="content latest">
      <search-bar></search-bar>
      <ukbm-list class="posts">
        <ukbm-item-skeleton></ukbm-item-skeleton>
      </ukbm-list>
    </section>
      `;
  },

  async afterRender() {
    await this.init();
    /* deklarasi variabel mapel dibawah agar nantinya bisa dipake buat search */
    // const mapel = await DiginasIdb.getAllUkbm();
    // await this.loadAllMapel(mapel);
    await this.loadUkbm();
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async loadUkbm() {
    const listData = await DataSource.ukbm();
    if (listData) {
      /* save data to idb */
      await DiginasIdb.putMultipleUkbm(listData);
      await this.showUkbmToList(listData, 'Problem loaded data, try again later');
      await this.searchButton(listData);
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

  // async loadAllMapel(mapel) {
  //   if (mapel) {
  //     const content = {
  //       data: mapel,
  //       error: 'Problem loaded data, try again later',
  //       element: this.ukbmListElement,
  //     };
  //     await addToList.init(content);
  //   } else {
  //     const IMG = await this.loadImg();
  //     this.mainContent.innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}"
  // alt="connection error, try again later">`;
  //   }
  // },

  async searchButton(data) {
    const mapelSearch = async () => {
      const filtered = await DiginasIdb.getByMapel(data, this.searchElement.value);

      this.showFilterToList(
        filtered,
        `tidak menemukan mata pelajaran ${this.searchElement.value}`,
      );
    };

    this.searchElement.clickEvent = mapelSearch;
  },

  async showFilterToList(data, error) {
    if (data.length > 0) {
      this.ukbmListElement.list = data;
    } else {
      this.ukbmListElement.renderError(error);
    }
  },
};

export default Ukbm;
