const UpdateButtonPresenter = {
  async init({
    mode, status, id, noted, dataSource, notif,
    IdJenisPengaduan, IdKategori, IdSubKategori, IdTicket,
  }) {
    this._mode = mode;
    this._status = status;
    this._noted = noted;
    this._id = id;
    this._IdJenisPengaduan = IdJenisPengaduan;
    this._IdKategori = IdKategori;
    this._IdSubKategori = IdSubKategori;
    this._IdTicket = IdTicket;
    this._dataSource = dataSource;
    this._notif = notif;
    await this.initParameters();
  },

  async initParameters() {
    const dataInput = {
      mode: this._mode,
      status: this._status,
      noted: this._noted,
      id: this._id,
      IdKategori: this._IdKategori,
      IdTicket: this._IdTicket,
      IdSubKategori: this._IdSubKategori,
      IdJenisPengaduan: this._IdJenisPengaduan,
    };
    await this.sendSubmit(dataInput);
  },

  async sendSubmit(dataInput) {
    let toast = null;
    try {
      const data = await this._dataSource.sendUpdate(dataInput);
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

export default UpdateButtonPresenter;
