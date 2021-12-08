import API_ENDPOINT from '../globals/api-endpoint';
import API_HELPER from '../globals/api-helper';

class AuthSource {
  static async login(data) {
    const response = await fetch(API_ENDPOINT.LOGIN, API_HELPER.optionForm(data));
    const result = await API_HELPER.check(response);

    if (result.authority) {
      return Promise.resolve(result.authority);
    }
    return Promise.reject(new Error('problem loaded'));
  }

  static async checkVersion() {
    const response = await fetch(API_ENDPOINT.CHECK_VERSION);
    const result = await API_HELPER.check(response);

    if (result.results) {
      return Promise.resolve(result.results);
    }
    return Promise.reject(new Error('problem loaded'));
  }

  static async logout() {
    const response = await fetch(API_ENDPOINT.LOGOUT, API_HELPER.optionClearSite());
    const result = await API_HELPER.check(response);

    if (result.authority) {
      result.AppendHeader('Clear-Site-Data', '"cache", "storage"');
      return Promise.resolve(result.authority);
    }
    return Promise.reject(new Error('problem loaded'));
  }
}

export default AuthSource;
