import CONFIG from '../globals/config';

const exitApp = async () => {
  // reminder, service worker can't run so, i am skip for temporary

  indexedDB.deleteDatabase(CONFIG.DATABASE_NAME);
  localStorage.clear();
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => Promise.all(
        cacheNames.filter((cacheName)).map((cacheName) => caches.delete(cacheName)),
      )),
    );
  });
  // CacheStorage.delete()('diginas-mtsn2jbr-v2');
  // cacheStorage.clear();
  // sessionStorage.clear();
  // indexedDB.close();
  /* clear element appbar and bottom nav */
  // const PARAMS = {
  //   mode: 'logout',
  //   id: 'KKDJWO334JRRJ94000XS0Q2',
  // };
  // const data = await AuthSource.logout(PARAMS);
  // if (!data.SUCCESS) {
  //   const appBarElement = document.querySelector('app-bar');
  //   const bottomNavElement = document.querySelector('bottom-nav');
  //   appBarElement.unRender();
  //   bottomNavElement.unRender();
  // }

  window.location.href = '#/';
  setTimeout(() => {
    //  response.AppendHeader('Clear-Site-Data:', '*');
    window.location.reload();
  }, 500);
};

export default exitApp;
