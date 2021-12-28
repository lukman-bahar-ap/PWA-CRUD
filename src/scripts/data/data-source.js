import API_ENDPOINT from '../globals/api-endpoint';
import API_HELPER from '../globals/api-helper';

class DataSource {
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

  static async resultAll(response) {
    const json = await response.json();
    return json;
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
