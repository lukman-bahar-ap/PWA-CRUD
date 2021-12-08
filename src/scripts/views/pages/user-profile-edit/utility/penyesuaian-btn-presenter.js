const PenyesuaianButtonPresenter = {
  async init({
    mode, id, data, edited, dataSource, notif, navigation,
  }) {
    this._mode = mode;
    this._id = id;
    this._data = data;
    this._edited = edited;
    this._dataSource = dataSource;
    this._notif = notif;
    this._navigation = navigation;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      id: this._id,
      tabel: this._data.TABLE,
      kolom: this._data.FIELD,
      lama: this._data.VALUE,
      baru: this._edited,
    };
    await this.sendRequest(dataInput);
  },

  async sendRequest(dataInput) {
    try {
      const data = await this._dataSource.requestPenyesuaian(dataInput);
      if (data.SUCCESS === true) {
        this._navigation.summon({ page: '/home', showAppbar: 1, showBottomNav: 1 });

        this._notif.init({
          icon: '<i class="large material-icons">check</i>',
          msg: data.INFO,
        });
      } else {
        this._notif.init({
          icon: '<i class="large material-icons">warning</i>',
          msg: data.INFO,
        });
      }
    } catch (message) {
      this._notif.init({
        icon: '<i class="large material-icons">warning</i>',
        msg: 'sedang gangguan, hubungi admin',
      });
    }
  },

};

export default PenyesuaianButtonPresenter;
