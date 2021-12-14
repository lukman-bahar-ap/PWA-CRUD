const LoginButtonPresenter = {
  async init({
    mode, username, password, idb, authSource, notif,
  }) {
    this._mode = mode;
    this._username = username;
    this._password = password;
    this._idb = idb;
    this._authSource = authSource;
    this._notif = notif;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      username: this._username,
      password: this._password,
      token: '',
      device: 'browser',
    };
    await this.sendAuth(dataInput);
  },

  async sendAuth(dataInput) {
    try {
      const data = await this._authSource.login(dataInput);
      if (data.SUCCESS) {
        await this._idb.putUser(data);
        import('../../../../main')
          .then((module) => module.default)
          .then((Main) => {
            // render page home first
            Main();
          });
      } else {
        this._notif.notif = data.INFO;
      }
    } catch (message) {
      this._notif.notif = ' please try again later or call helpdesk';
    }
  },

};

export default LoginButtonPresenter;
