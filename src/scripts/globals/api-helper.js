import CONFIG from './config';

const API_HELPER = {
  option(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(data),
    };
  },

  optionJson() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      credentials: 'include',
    };
  },

  optionForm(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },

  optionPOSTNoCors(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(data),
    };
  },
  optionClearSite(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Clear-Site-Data': '"cache", "storage"',
      },
      mode: 'no-cors',
      credentials: 'include',
      body: JSON.stringify(data),
      crossDomain: true,
      xhrFields: {
        withCredentials: true,
      },
    };
  },

  async check(response) {
    if (response.status === 200) {
      const responseJson = await response.json();
      return responseJson;
    }
    return response.status;
  },

};

export default API_HELPER;
