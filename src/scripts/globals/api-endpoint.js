import CONFIG from './config';

const API_ENDPOINT = {
  SEARCH: (keyword) => `${CONFIG.BASE_URL}search?q=${keyword}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_REVIEW: `${CONFIG.BASE_URL}review`,
  // new
  CHECK_VERSION: `${CONFIG.SERV_URL}api-mobile/version_json.php?v=${CONFIG.APP_VERSION}`,
  LOGIN: `${CONFIG.SERV_URL}api-mobile/login_json.php`,
  HISTORY_USER: `${CONFIG.SERV_URL}api-mobile/history_ticket_user_json.php`,
  HISTORY: `${CONFIG.SERV_URL}api-mobile/history_ticket_json.php`,
  CHANGEPASS: `${CONFIG.SERV_URL}api-mobile/change_pass.php`,
  CHANGEPASS_USER: `${CONFIG.SERV_URL}api-mobile/change_pass_user.php`,
  CREATE_TICKET: `${CONFIG.SERV_URL}api-mobile/create_ticket.php`,
  LIST_DELEGATION_TICKET: `${CONFIG.SERV_URL}api-mobile/status_tiket_json.php`,
  LIST_OPEN_TICKET: `${CONFIG.SERV_URL}api-mobile/monitoring_tiket_json.php`,
  POST_TICKET: `${CONFIG.SERV_URL}api-mobile/submit_status_tiket.php`,
  DETAIL_TICKET_IT: `${CONFIG.SERV_URL}api-mobile/detail_ticket_it_json.php`,
  DETAIL_TICKET_HELPDESK: `${CONFIG.SERV_URL}api-mobile/detail_ticket_helpdesk_json.php`,

  // old
  DASHBOARD: `${CONFIG.SERV_URL}api-mobile/dashboard_json.php`,
  KRS_REGISTER_FORM: `${CONFIG.SERV_URL}api-mobile/registrasi_krs.php`,
  UKBM: `${CONFIG.SERV_URL}api-mobile/ukbm_json.php`,
  UKBM_DASHBOARD: `${CONFIG.SERV_URL}api-mobile/ukbm_dashboard_json.php`,
  PENCAPAIAN: `${CONFIG.SERV_URL}api-mobile/ukbm_detail_json.php`,
  KD: `${CONFIG.SERV_URL}api-mobile/kd_json.php`,

  PROFIL_PERSONAL: `${CONFIG.SERV_URL}api-mobile/profil_data_personal_json.php`,
  PROFIL_IMUNISASI: `${CONFIG.SERV_URL}api-mobile/profil_imunisasi_json.php`,
  PROFIL_KELUARGA: `${CONFIG.SERV_URL}api-mobile/profil_keluarga_json.php`,
  PROFIL_SCH_BEFORE: `${CONFIG.SERV_URL}api-mobile/profil_sekolah_sebelumnya_json.php`,
  PROFIL_TMPT_TINGGAL: `${CONFIG.SERV_URL}api-mobile/profil_tempat_tinggal_json.php`,
  PROFIL_UPDATE: `${CONFIG.SERV_URL}api-mobile/profil_update.php`,
  KRS_UPDATE: `${CONFIG.SERV_URL}api-mobile/krs_update.php`,
  PENYESUAIAN_DATA_UPDATE: `${CONFIG.SERV_URL}api-mobile/penyesuaian_data_update.php`,
  LOGOUT: `${CONFIG.SERV_URL}api-mobile/logout.php`,
  NOTIF: `${CONFIG.SERV_URL}api-mobile/notif_json.php`,
  NOTIF_DASHBOARD: `${CONFIG.SERV_URL}api-mobile/notif_dashboard_json.php`,
  NOTIF_DETAIL: `${CONFIG.SERV_URL}api-mobile/notif_detail_json.php`,
  NOTIF_UPDATE: `${CONFIG.SERV_URL}api-mobile/notif_update.php`,
  BERITA: `${CONFIG.SERV_URL}api-mobile/berita_json.php`,
  BERITA_DETAIL: `${CONFIG.SERV_URL}api-mobile/berita_detail_json.php`,
};

export default API_ENDPOINT;
