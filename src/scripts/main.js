import './views/components/skip-to-content';
import './views/components/app-bar';
import './views/components/footer-elm';
import './views/components/toast-elm';
import '../styles/main.scss';
import '../styles/hero.scss';
import '../styles/progressbar.scss';
import '../styles/circle.scss';
import '../styles/timeline.scss';
import '../styles/form.scss';
import App from './views/app';

const Main = () => {
  const app = new App({
    open: document.querySelector('#drawer-open'),
    close: document.querySelector('#drawer-close'),
    drawer: document.querySelector('#drawer'),
    otherMenu: document.querySelector('#bottomnav'),
    content: document.querySelector('#main-content'),
    appbar: document.querySelector('.appbar'),
  });
  // jika homepage belum muncul coba masukkan code ini di window.addEventListener('load',()=>{...})
  app.renderPage();

  // call routes on event url haschange
  const drawer = document.querySelector('#drawer');
  window.addEventListener('hashchange', (event) => {
    import('./utils/drawer-initiator')
      .then((module) => module.default)
      .then((DrawerInitiator) => DrawerInitiator._closeDrawer(event, drawer))
      .catch((error) => new Error(error));

    app.renderPage();
  });
};

export default Main;
