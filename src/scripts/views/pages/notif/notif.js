import './component/notif-list';
import DataSource from '../../../data/data-source';
import DiginasIdb from '../../../data/diginas-idb';
import addToList from '../../../utils/add-to-list';

const Profil = {
  async init() {
    this.notifListElement = document.querySelector('notif-list');
    /* clear ukbm because will renew it with fetch again */
  },
  async render() {
    return `
    <section class="content latest">
    <div class="app-header-margin"></div>
      <notif-list></notif-list>
    </section> 
      `;
  },

  async afterRender() {
    await this.init();
    await this.loadContent();
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async putReadedNotifMultiple(data) {
    const listNotif = await DiginasIdb.getAllNotif();
    const dataNotif = await data.map((key) => key.NOTIFIKASI_ID);
    const putMatchNotif = listNotif.filter((f) => !dataNotif.includes(f));
    // hapus notif sebelumnya karena akan diganti list baru, biar user ga save banyak2 data
    await DiginasIdb.clearStoreNotif();

    if (putMatchNotif.length > 0) {
      await DiginasIdb.putMultipleNotif(putMatchNotif);
    }
  },

  async findByMatchingProperties(set, properties) {
    return set.filter((entry) => Object.keys(properties).every(
      (key) => entry[key] === properties[key],
    ));
  },

  async loadContent() {
    const listData = await DataSource.notif();
    if (listData) {
      const content = {
        data: listData,
        error: 'Problem loaded data, try again later',
        element: this.notifListElement,
      };
      await addToList.init(content);
      await this.putReadedNotifMultiple(listData);
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" src="${IMG.NOT_FOUND}" alt="connection error, try again later">`;
    }
  },

};

export default Profil;
