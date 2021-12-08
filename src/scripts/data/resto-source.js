import API_ENDPOINT from '../globals/api-endpoint';

class RestoSource {
  static async list() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants ? responseJson.restaurants : false;
  }

  static async search(keyword) {
    const response = await fetch(API_ENDPOINT.SEARCH(keyword));
    const responseJson = await response.json();
    return (responseJson.founded > 0) ? responseJson.restaurants : false;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async loadHelper() {
    return import('../globals/api-helper')
      .then((module) => module.default)
      .then((API_HELPER) => API_HELPER)
      .catch((error) => new Error(error));
  }

  static async sendReview(data) {
    const helper = await this.loadHelper();
    const response = await fetch(API_ENDPOINT.POST_REVIEW, helper.option(data));
    const result = await helper.check(response);

    if (result.customerReviews) {
      return Promise.resolve(result.customerReviews);
    }

    return Promise.reject(new Error('problem loaded'));
  }
}

export default RestoSource;
