import API_ENDPOINT from '../globals/api-endpoint';
import API_HELPER from '../globals/api-helper';
import DiginasIdb from './diginas-idb';

class DataSource {
  // new
  static async getCredentialFromDb() {
    const data = await DiginasIdb.getAllUsers();
    /* ambil urutan req pertama karena isinya hanya 1 rec.
    kemudian ambil field PESERTA_DIDIK_ID aja untuk kebutuhan parsing ke server */
    return data[0].IDLOG;
  }

  static async getProfilFromDb() {
    const data = await DiginasIdb.getAllUsers();
    /* ambil urutan req pertama karena isinya hanya 1 rec. */
    return {
      userId: data[0].USER_ID,
      username: data[0].USERNAME,
      loginId: data[0].IDLOG,
      hk: data[0].H_AKSES,
    };
  }

  static async resultPromise(response) {
    const json = await API_HELPER.check(response);
    /* this condition only for named array[results] => json.results */
    if (json.results) {
      return Promise.resolve(json.results);
    }
    return Promise.reject(new Error('problem loaded'));
  }

  static async resultByPassCheck(response) {
    const json = await response.json();
    /* this condition only for named array[results] => json.results */
    return json.results ? json.results : false;
  }

  static async historiTicket() {
    const profil = await this.getProfilFromDb();
    const id = await profil.userId;
    const hk = await profil.hk;
    // cek hak akses apakah user atau IT ?
    const URL = (hk === '1') ? `${API_ENDPOINT.HISTORY_USER}?id=${id}&hk=${hk}` : `${API_ENDPOINT.HISTORY}?id=${id}`;

    const response = await fetch(URL);
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async password(data) {
    const profil = await this.getProfilFromDb();
    const hk = await profil.hk;
    let id = await profil.loginId;
    // cek hak akses apakah user atau IT ?
    let URL = API_ENDPOINT.CHANGEPASS;
    if (hk === '1') {
      URL = API_ENDPOINT.CHANGEPASS_USER;
      id = await profil.userId;
    }
    const requirement = { ...data, id, hk };
    const response = await fetch(URL, API_HELPER.optionForm(requirement));
    const result = await this.resultPromise(response);
    return result;
  }

  static async sendComplaint(data) {
    const profil = await this.getProfilFromDb();
    const hk = await profil.hk;
    const idLogin = await profil.loginId;
    const idUser = await profil.userId;

    const requirement = {
      ...data, idLogin, idUser, hk,
    };
    const response = await fetch(API_ENDPOINT.CREATE_TICKET, API_HELPER.optionForm(requirement));
    const result = await this.resultPromise(response);
    return result;
  }

  // old
  static async dashboard() {
    const id = await this.getCredentialFromDb();
    const URL = `${API_ENDPOINT.DASHBOARD}?id=${id}`;
    const response = await fetch(URL);
    const result = await this.resultPromise(response);
    return result;
  }

  static async ukbmDashboard(id, krsId) {
    const URL = `${API_ENDPOINT.UKBM_DASHBOARD}?id=${id}&krs=${krsId}`;
    const response = await fetch(URL);
    // const response = await fetch(API_ENDPOINT.UKBM_DASHBOARD,
    // API_HELPER.optionForm({ id, krsId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async pencapaian(id, krsId) {
    const URL = `${API_ENDPOINT.PENCAPAIAN}?id=${id}&krs=${krsId}`;
    const response = await fetch(URL);
    // const response = await fetch(API_ENDPOINT.PENCAPAIAN, API_HELPER.optionForm({ id, krsId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async kd(krsId) {
    const URL = `${API_ENDPOINT.KD}?krs=${krsId}`;
    const response = await fetch(URL);
    // const response = await fetch(API_ENDPOINT.KD, API_HELPER.optionForm({ krsId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async profil(tab) {
    const profil = await this.getProfilFromDb();
    const id = await profil.nisn;
    const endpoint = () => {
      switch (tab) {
        case 'imunisasi': return API_ENDPOINT.PROFIL_IMUNISASI;
        case 'keluarga': return API_ENDPOINT.PROFIL_KELUARGA;
        case 'sekolah-sebelumnya': return API_ENDPOINT.PROFIL_SCH_BEFORE;
        case 'tmpt-tinggal': return API_ENDPOINT.PROFIL_TMPT_TINGGAL;
        default: return API_ENDPOINT.PROFIL_PERSONAL;
      }
    };
    const response = await fetch(endpoint(), API_HELPER.optionForm({ id }));
    const result = await this.resultPromise(response);
    return result;
  }

  static async formKrs({ id, krsId }) {
    const response = await fetch(API_ENDPOINT.KRS_REGISTER_FORM,
      API_HELPER.optionForm({ id, krsId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async registrasiKrs({ mode, krs }) {
    const response = await fetch(API_ENDPOINT.KRS_UPDATE,
      API_HELPER.optionForm({ mode, krs }));
    const result = await this.resultPromise(response);
    return result;
  }

  static async requestPenyesuaian(data) {
    const response = await fetch(API_ENDPOINT.PENYESUAIAN_DATA_UPDATE, API_HELPER.optionForm(data));
    const result = await this.resultPromise(response);
    return result;
  }

  static async notif() {
    const profil = await this.getProfilFromDb();
    const id = await profil.userId;
    const kelasId = await profil.kelasid;

    const response = await fetch(API_ENDPOINT.NOTIF, API_HELPER.optionForm({ id, kelasId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async notifDashboard() {
    const profil = await this.getProfilFromDb();
    const id = await profil.userId;
    const kelasId = await profil.kelasid;

    const response = await fetch(API_ENDPOINT.NOTIF_DASHBOARD,
      API_HELPER.optionForm({ id, kelasId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async notifDetail(id) {
    const URL = `${API_ENDPOINT.NOTIF_DETAIL}?id=${id}`;
    const response = await fetch(URL);
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async notifRead(msgId, relationField) {
    const id = await this.getCredentialFromDb();

    const requirement = { id, msgId, relationField };
    const response = await fetch(API_ENDPOINT.NOTIF_UPDATE, API_HELPER.optionForm(requirement));
    const result = await this.resultPromise(response);
    return result;
  }

  static async berita() {
    const response = await fetch(API_ENDPOINT.BERITA);
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async beritaDetail(id) {
    const URL = `${API_ENDPOINT.BERITA_DETAIL}?id=${id}`;
    const response = await fetch(URL);
    const result = await this.resultByPassCheck(response);
    return result;
  }
}

export default DataSource;
