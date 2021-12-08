const RegisterButtonPresenter = {
  async init({
    mode, krs, dataSource, notif, navigation,
  }) {
    this._mode = mode;
    this._krs = krs;
    this._dataSource = dataSource;
    this._notif = notif;
    this._navigation = navigation;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      krs: this._krs,
    };
    await this.sendRegister(dataInput);
  },

  async sendRegister(dataInput) {
    try {
      const data = await this._dataSource.registrasiKrs(dataInput);
      if (data.SUCCESS === true) {
        this._navigation.summon({ page: '/home', showAppbar: 1, showBottomNav: 1 });

        this._notif.init({
          icon: '<i class="large material-icons">success</i>',
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

export default RegisterButtonPresenter;
