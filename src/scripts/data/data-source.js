import API_ENDPOINT from '../globals/api-endpoint';
import API_HELPER from '../globals/api-helper';
import DiginasIdb from './diginas-idb';

class DataSource {
  static async getCredentialFromDb() {
    const data = await DiginasIdb.getAllUsers();
    /* ambil urutan req pertama karena isinya hanya 1 rec.
    kemudian ambil field PESERTA_DIDIK_ID aja untuk kebutuhan parsing ke server */
    return data[0].PESERTA_DIDIK_ID;
  }

  static async getProfilFromDb() {
    const data = await DiginasIdb.getAllUsers();
    /* ambil urutan req pertama karena isinya hanya 1 rec. */
    return { id: data[0].PESERTA_DIDIK_ID, nisn: data[0].NISN, kelasid: data[0].KELAS_ID };
  }

  static async getAkademikFromDb() {
    const data = await DiginasIdb.getAkademik();
    /* ambil urutan req pertama karena isinya hanya 1 rec. */
    return {
      id: data[0].PESERTA_DIDIK_ID,
      kkm: data[0].KKM,
      krsId: data[0].KRS_MASTER_ID,
      pesertaKrsId: data[0].PESERTA_DIDIK_KRS_ID,
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

  static async dashboard() {
    const id = await this.getCredentialFromDb();
    const URL = `${API_ENDPOINT.DASHBOARD}?id=${id}`;
    const response = await fetch(URL);
    const result = await this.resultPromise(response);
    return result;
  }

  static async ukbm() {
    const profil = await this.getAkademikFromDb();
    const id = await profil.id;
    const krsId = await profil.krsId;

    const URL = `${API_ENDPOINT.UKBM}?id=${id}&krs=${krsId}`;
    const response = await fetch(URL);
    // const response = await fetch(API_ENDPOINT.UKBM, API_HELPER.optionForm({ id, krsId }));
    const result = await this.resultByPassCheck(response);
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

  static async histori() {
    const profil = await this.getAkademikFromDb();
    const id = await profil.id;
    const krsId = await profil.krsId;

    const URL = `${API_ENDPOINT.HISTORY}?id=${id}&krs=${krsId}`;
    const response = await fetch(URL);
    // const response = await fetch(API_ENDPOINT.HISTORY, API_HELPER.optionForm({ id, krsId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async password(data) {
    const profil = await this.getProfilFromDb();
    const nisn = await profil.nisn;

    const requirement = { ...data, nisn };
    const response = await fetch(API_ENDPOINT.CHANGEPASS, API_HELPER.optionForm(requirement));
    const result = await this.resultPromise(response);
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
    const id = await profil.id;
    const kelasId = await profil.kelasid;

    const response = await fetch(API_ENDPOINT.NOTIF, API_HELPER.optionForm({ id, kelasId }));
    const result = await this.resultByPassCheck(response);
    return result;
  }

  static async notifDashboard() {
    const profil = await this.getProfilFromDb();
    const id = await profil.id;
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
