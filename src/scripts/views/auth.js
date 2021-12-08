import AccessLogin from './pages/access-login/access-login';
import DiginasIdb from '../data/diginas-idb';

class Auth {
  constructor({ content }) {
    this._content = content;
  }

  async authPage() {
    /* render login page */
    this._content.innerHTML = await AccessLogin.render();
    await AccessLogin.afterRender();
  }

  async loadAuth() {
    const data = await DiginasIdb.getAllUsers();
    /* import main if have data and should have field peserta_didik_id > 0 */
    /* use return and (if condition) ? true : false */
    return (data.length > 0 && data[0].PESERTA_DIDIK_ID > 0)
      ? import('../main')
        .then((module) => module.default)
        .then((Main) => {
          /* render code main (page home first) */
          Main();
        })
      /*  import auth (login) if not have credential */
      : this.authPage();
  }
}

export default Auth;
