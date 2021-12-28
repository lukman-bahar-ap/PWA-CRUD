import CONFIG from './config';

const API_ENDPOINT = {
  SEARCH: (keyword) => `${CONFIG.BASE_URL}search?q=${keyword}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_REVIEW: `${CONFIG.BASE_URL}review`,
  // new
  DETAIL_TICKET_HELPDESK: `${CONFIG.SERV_URL}api-mobile/detail_ticket_helpdesk_json.php`,

};

export default API_ENDPOINT;
