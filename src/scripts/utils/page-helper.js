/* helper SPA => Singgle Page Application for replace page */
import App from '../views/app';
import DrawerInitiator from './drawer-initiator';

const spaHelper = {
  summon(params) {
    const { page, showAppbar, showBottomNav } = params;

    window.location.replace(`#${page}`);

    const bottomNavElement = document.querySelector('bottom-nav');
    const appBarElement = document.querySelector('app-bar');
    if (showAppbar === 1) { appBarElement.render(); }
    if (showBottomNav === 1) { bottomNavElement.render(); }

    const app = new App({
      open: document.querySelector('#drawer-open'),
      close: document.querySelector('#drawer-close'),
      drawer: document.querySelector('#drawer'),
      otherMenu: document.querySelector('#bottomnav'),
      content: document.querySelector('#main-content'),
      appbar: document.querySelector('.appbar'),
    });

    // app.transparentAppBar(page);
    // call routes on event url haschange
    const drawer = document.querySelector('#drawer');
    window.addEventListener('hashchange', (event) => {
      DrawerInitiator._closeDrawer(event, drawer);
      app.renderPage();
    });

    document.querySelector('#logout').addEventListener('click', async (e) => {
      e.preventDefault();
      await import('./exit-app')
        .then((module) => module.default)
        .then((exitApp) => exitApp())
        .catch((error) => new Error(error));
    });
  },
};

export default spaHelper;
