import { openDB } from 'idb';
import CONFIG from '../globals/config';

const {
  DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NOTE,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NOTE, { keyPath: 'ID' });

    // const objectStore = database.createObjectStore(OBJECT_STORE_NILAI, { keyPath: 'URUTAN' });
    // objectStore.createIndex('KRS_ID', 'KRS_ID', { unique: false });
    // objectStore.createIndex('KD_ID', 'KD_ID', { unique: false });
  },
});

const DiginasIdb = {
  async destroyIdb() {
    return (await dbPromise).deleteDatabase(DATABASE_NAME);
  },
  async closeIdb() {
    return (await dbPromise).close();
  },
  // USER
  async getUser(idlogin) {
    if (!idlogin) {
      return false;
    }
    return (await dbPromise).get(OBJECT_STORE_NOTE, idlogin);
  },
  async putUser(User) {
    if (!User.hasOwnProperty('ID')) {
      return false;
    }
    return (await dbPromise).put(OBJECT_STORE_NOTE, User);
  },
  async deleteUser(idlogin) {
    return (await dbPromise).delete(OBJECT_STORE_NOTE, idlogin);
  },
  async getAllUsers() {
    return (await dbPromise).getAll(OBJECT_STORE_NOTE);
  },
  async clearUsers() {
    return (await dbPromise).clear(OBJECT_STORE_NOTE);
  },
  async checkUser() {
    const data = await this.getAllUsers();
    if (data.length > 0) {
      return true;
    }
    return false;
  },
};

export default DiginasIdb;
