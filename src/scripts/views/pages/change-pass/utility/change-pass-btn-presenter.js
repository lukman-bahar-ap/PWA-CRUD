const ChangePassButtonPresenter = {
  async init({
    mode, password, dataSource, notif,
  }) {
    this._mode = mode;
    this._password = password;
    this._dataSource = dataSource;
    this._notif = notif;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      password: this._password,
    };
    await this.sendSubmit(dataInput);
  },

  async sendSubmit(dataInput) {
    let toast = null;
    try {
      const data = await this._dataSource.password(dataInput);
      if (data.SUCCESS) {
        toast = {
          icon: '<i class="material-icons pr-low">keyboard</i>',
          msg: 'Password Berhasil Diubah',
        };
      } else {
        toast = {
          icon: '<i class="material-icons pr-low">keyboard</i>',
          msg: data.INFO,
        };
      }
    } catch (message) {
      toast = {
        icon: '<i class="material-icons pr-low">keyboard</i>',
        msg: 'Password Gagal Diubah',
      };
    }
    await this._notif(toast);
  },

};

export default ChangePassButtonPresenter;
