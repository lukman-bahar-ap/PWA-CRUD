import AuthSource from '../data/auth-source';

const appVersion = {
  async checkChatBoxInputKey() {
    try {
      const data = await AuthSource.checkVersion();
      // clean up old SW caches if apps version not match
      return (data.APP === false) ? this._deleteAllChace : true;
    } catch {
      return true;
    }
  },

  async _deleteAllChace() {
    if ('serviceWorker' in navigator) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
          console.log(`${cacheName} is deleted`);
        });
      }).then(windows.refresh());
    }
  },
};
export default appVersion;
