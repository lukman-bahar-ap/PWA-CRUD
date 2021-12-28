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

  window.location.href = '#/';
  setTimeout(() => {
    //  response.AppendHeader('Clear-Site-Data:', '*');
    window.location.reload();
  }, 500);
};

export default exitApp;
