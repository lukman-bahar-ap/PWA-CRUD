import { openDB } from 'idb';
import CONFIG from '../globals/config';

const {
  DATABASE_NAME, DATABASE_VERSION,
  OBJECT_STORE_AKADEMIK, OBJECT_STORE_USER,
  OBJECT_STORE_UKBM, OBJECT_STORE_NILAI, OBJECT_STORE_PROFIL, OBJECT_STORE_NOTIF,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_AKADEMIK, { keyPath: 'KRS_MASTER_ID' });
    database.createObjectStore(OBJECT_STORE_USER, { keyPath: 'IDLOG' });
    database.createObjectStore(OBJECT_STORE_UKBM, { keyPath: 'KRS_ID' });
    database.createObjectStore(OBJECT_STORE_PROFIL, { keyPath: 'FIELD' });
    database.createObjectStore(OBJECT_STORE_NOTIF, { keyPath: 'NOTIFIKASI_ID' });

    const objectStore = database.createObjectStore(OBJECT_STORE_NILAI, { keyPath: 'URUTAN' });
    objectStore.createIndex('KRS_ID', 'KRS_ID', { unique: false });
    objectStore.createIndex('KD_ID', 'KD_ID', { unique: false });
  },
});

const DiginasIdb = {
  async destroyIdb() {
    return (await dbPromise).deleteDatabase(DATABASE_NAME);
  },
  async closeIdb() {
    return (await dbPromise).close();
  },
  // PROFIL
  async getProfil(f) {
    if (!f) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_PROFIL, f);
  },
  async putProfilMultiple(Data) {
    if (!Data[0].hasOwnProperty('FIELD')) {
      return false;
    }
    return Promise.all(Data.map(
      async (record) => (await dbPromise).put(OBJECT_STORE_PROFIL, record),
    ));
  },
  async clearProfil() {
    return (await dbPromise).clear(OBJECT_STORE_PROFIL);
  },
  // AKADEMIK
  async getAkademik() {
    return (await dbPromise).getAll(OBJECT_STORE_AKADEMIK);
  },
  async putAkademik(Data) {
    if (!Data.hasOwnProperty('KRS_MASTER_ID')) {
      return false;
    }
    return (await dbPromise).put(OBJECT_STORE_AKADEMIK, Data);
  },
  async clearAkademik() {
    return (await dbPromise).clear(OBJECT_STORE_AKADEMIK);
  },
  // USER
  async getUser(idlogin) {
    if (!idlogin) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_USER, idlogin);
  },
  async putUser(User) {
    if (!User.hasOwnProperty('IDLOG')) {
      return false;
    }
    return (await dbPromise).put(OBJECT_STORE_USER, User);
  },
  async deleteUser(idlogin) {
    return (await dbPromise).delete(OBJECT_STORE_USER, idlogin);
  },
  async getAllUsers() {
    return (await dbPromise).getAll(OBJECT_STORE_USER);
  },
  async clearUsers() {
    return (await dbPromise).clear(OBJECT_STORE_USER);
  },
  async checkUser() {
    const data = await this.getAllUsers();
    if (data.length > 0) {
      return true;
    }
    return false;
  },
  // ukbm
  async getUkbm(krsId) {
    if (!krsId) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_UKBM, krsId);
  },
  async putMultipleUkbm(Ukbm) {
    if (!Ukbm[0].hasOwnProperty('KRS_ID')) {
      return false;
    }
    return Promise.all(Ukbm.map(
      async (record) => (await dbPromise).put(OBJECT_STORE_UKBM, record),
    ));
  },
  async clearUkbm() {
    return (await dbPromise).clear(OBJECT_STORE_UKBM);
  },
  async getAllUkbm() {
    return (await dbPromise).getAll(OBJECT_STORE_UKBM);
  },
  async checkUkbm() {
    const data = await this.getAllUkbm();
    if (data.length > 0) {
      return true;
    }
    return false;
  },
  async getByMapel(data, keyword) {
    return (await data).filter((d) => d.NAMA_MAPEL.toUpperCase().includes(keyword.toUpperCase()));
  },
  // nilai
  async getNilai(kdId) {
    if (!kdId) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_NILAI, kdId);
  },
  async getNilaiFromKRsId(krsId) {
    if (!krsId) {
      return false;
    }
    const tr = (await dbPromise).transaction(OBJECT_STORE_NILAI, 'readonly');
    const store = tr.objectStore(OBJECT_STORE_NILAI);
    return store.index('KRS_ID').getAll(krsId);
  },
  async putMultipleNilai(Nilai) {
    if (!Nilai[0].hasOwnProperty('URUTAN')) {
      return false;
    }
    return Promise.all(Nilai.map(
      async (rec) => (await dbPromise).put(OBJECT_STORE_NILAI, rec),
    ));
  },
  async clearNilai(kdId) {
    return (await dbPromise).clear(OBJECT_STORE_NILAI, kdId);
  },
  async clearStoreNilai() {
    return (await dbPromise).clear(OBJECT_STORE_NILAI);
  },
  async getAllNilai() {
    return (await dbPromise).getAll(OBJECT_STORE_NILAI);
  },
  async checkNilai() {
    const data = await this.getAllNilai();
    if (data.length > 0) {
      return true;
    }
    return false;
  },
  async getByKrsId(data, krsId) {
    return (await data).filter((nilai) => nilai.KRS_ID === krsId);
  },
  // notif
  async getNotif(msgId) {
    if (!msgId) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_NOTIF, msgId);
  },
  async clearStoreNotif() {
    return (await dbPromise).clear(OBJECT_STORE_NOTIF);
  },
  async putNotif(Notif) {
    if (!Notif.hasOwnProperty('NOTIFIKASI_ID')) {
      return false;
    }
    return (await dbPromise).put(OBJECT_STORE_NOTIF, Notif);
  },
  async putMultipleNotif(Notif) {
    if (!Notif[0].hasOwnProperty('NOTIFIKASI_ID')) {
      return false;
    }
    return Promise.all(Notif.map(
      async (record) => (await dbPromise).put(OBJECT_STORE_NOTIF, record),
    ));
  },
  async getNotifPersonal(data) {
    return (await data).filter((d) => d.PESERTA_DIDIK_ID > 0);
  },
  async getAllNotif() {
    return (await dbPromise).getAll(OBJECT_STORE_NOTIF);
  },
};

export default DiginasIdb;
