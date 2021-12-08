const DashboardPencapaian = {
  async calculate(data) {
    const dashboardValue = {
      countFinished: await this._count(data),
      maxPengetahuan: await this._maxPengetahuan(data),
      maxKeterampilan: await this._maxKeterampilan(data),
      countRemidi: await this._countNowRemidi(data),
      countRemidiEver: await this._countRemidi(data),
    };

    return dashboardValue;
  },

  async _count(results) {
    const data = await results.filter((n) => n.NILAI_PENGETAHUAN > 0 || n.NILAI_KETERAMPILAN > 0);
    return data.length;
  },

  async _maxPengetahuan(results) {
    const data = await results.map((nilai) => nilai.NILAI_PENGETAHUAN);
    return Math.max.apply(null, data);
  },

  async _maxKeterampilan(results) {
    const data = await results.map((nilai) => nilai.NILAI_KETERAMPILAN);
    return Math.max.apply(null, data);
  },

  async _countNowRemidi(results) {
    const data = await results.filter((nilai) => nilai.STATUS_NP === '0' || nilai.STATUS_NK === '0');
    return data.length;
  },

  async _countRemidi(results) {
    const data = await results.filter((nilai) => nilai.REMIDIAL_NP > 0 || nilai.REMIDIAL_NK > 0);
    return data.length;
  },

};
export default DashboardPencapaian;
