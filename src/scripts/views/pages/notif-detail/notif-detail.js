import './component/detail-pesan';
import UrlParser from '../../../routes/url-parser';
import DataSource from '../../../data/data-source';
import DiginasIdb from '../../../data/diginas-idb';

const NotifDetail = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = url.id;

    this.notifElement = document.querySelector('detail-pesan');
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
            Detail Pesan
          </h2>
          <div class="app-header-margin"></div>
          <detail-pesan></detail-pesan>
        </section>
      `;
  },

  async afterRender() {
    await this.init();
    await this.isLoaded();
  },

  async loadDatail(notif) {
    this.notifElement.detail = notif;
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
      await this.loadDatail(data);
      // update to read
      await this.sendReaded(data);
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" 
      src="${IMG.NOT_FOUND}" alt="connection error, try again later" class="lazyload">`;
    }
  },

  async getFromSource(id) {
    try {
      const detail = await DataSource.notifDetail(id);
      return detail;
    } catch {
      return false;
    }
  },

  async sendReaded(data) {
    const msgId = data.NOTIFIKASI_ID;
    const relationField = data.RELATION_FIELD;
    const readed = data.READED;
    await DiginasIdb.putNotif({ NOTIFIKASI_ID: msgId });
    // jika belum dibaca dan pesan hanya dituju utk personal
    if ((readed === '0' || readed === 0) && (relationField === '4' || relationField === 4)) {
      const update = await this.updateRead(msgId, relationField);
      return update;
    }
    return false;
  },

  async updateRead(msgId, relationField) {
    try {
      const update = await DataSource.notifRead(msgId, relationField);
      return update;
    } catch {
      return false;
    }
  },

};

export default NotifDetail;
