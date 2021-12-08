import CONFIG from './config';

const API_ENDPOINT = {
  SEARCH: (keyword) => `${CONFIG.BASE_URL}search?q=${keyword}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  POST_REVIEW: `${CONFIG.BASE_URL}review`,
  CHECK_VERSION: `${CONFIG.SERV_URL}api-apps/version_json.php?v=${CONFIG.APP_VERSION}`,
  LOGIN: `${CONFIG.SERV_URL}api-apps/login_json.php`,
  DASHBOARD: `${CONFIG.SERV_URL}api-apps/dashboard_json.php`,
  KRS_REGISTER_FORM: `${CONFIG.SERV_URL}api-apps/registrasi_krs.php`,
  UKBM: `${CONFIG.SERV_URL}api-apps/ukbm_json.php`,
  UKBM_DASHBOARD: `${CONFIG.SERV_URL}api-apps/ukbm_dashboard_json.php`,
  PENCAPAIAN: `${CONFIG.SERV_URL}api-apps/ukbm_detail_json.php`,
  KD: `${CONFIG.SERV_URL}api-apps/kd_json.php`,
  HISTORY: `${CONFIG.SERV_URL}api-apps/history_json.php`,
  CHANGEPASS: `${CONFIG.SERV_URL}api-apps/password_update.php`,
  PROFIL_PERSONAL: `${CONFIG.SERV_URL}api-apps/profil_data_personal_json.php`,
  PROFIL_IMUNISASI: `${CONFIG.SERV_URL}api-apps/profil_imunisasi_json.php`,
  PROFIL_KELUARGA: `${CONFIG.SERV_URL}api-apps/profil_keluarga_json.php`,
  PROFIL_SCH_BEFORE: `${CONFIG.SERV_URL}api-apps/profil_sekolah_sebelumnya_json.php`,
  PROFIL_TMPT_TINGGAL: `${CONFIG.SERV_URL}api-apps/profil_tempat_tinggal_json.php`,
  PROFIL_UPDATE: `${CONFIG.SERV_URL}api-apps/profil_update.php`,
  KRS_UPDATE: `${CONFIG.SERV_URL}api-apps/krs_update.php`,
  PENYESUAIAN_DATA_UPDATE: `${CONFIG.SERV_URL}api-apps/penyesuaian_data_update.php`,
  LOGOUT: `${CONFIG.SERV_URL}api-apps/logout.php`,
  NOTIF: `${CONFIG.SERV_URL}api-apps/notif_json.php`,
  NOTIF_DASHBOARD: `${CONFIG.SERV_URL}api-apps/notif_dashboard_json.php`,
  NOTIF_DETAIL: `${CONFIG.SERV_URL}api-apps/notif_detail_json.php`,
  NOTIF_UPDATE: `${CONFIG.SERV_URL}api-apps/notif_update.php`,
  BERITA: `${CONFIG.SERV_URL}api-apps/berita_json.php`,
  BERITA_DETAIL: `${CONFIG.SERV_URL}api-apps/berita_detail_json.php`,
};

export default API_ENDPOINT;
