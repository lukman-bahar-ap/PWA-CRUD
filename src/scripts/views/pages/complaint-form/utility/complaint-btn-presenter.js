const ComplaintButtonPresenter = {
  async init({
    mode, sn, location, complaint, dataSource, notif,
  }) {
    this._mode = mode;
    this._sn = sn;
    this._location = location;
    this._complaint = complaint;
    this._dataSource = dataSource;
    this._notif = notif;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      sn: this._sn,
      location: this._location,
      complaint: this._complaint,
    };
    await this.sendSubmit(dataInput);
  },

  async sendSubmit(dataInput) {
    let toast = null;
    try {
      const data = await this._dataSource.sendComplaint(dataInput);
      if (data.SUCCESS) {
        toast = {
          icon: '<i class="material-icons pr-low">keyboard</i>',
          msg: 'Success',
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
        msg: 'Failed Send',
      };
    }
    await this._notif(toast);
  },

};

export default ComplaintButtonPresenter;
