class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  set headerClose(headerText) {
    this._headerText = headerText;
    this.renderClose();
  }

  renderClose() {
    this.innerHTML = `<div class="appbar">
    <button id="close-page" class="header__button" aria-label="close page">
        <i class="material-icons">close</i>
    </button>
        <div class="header__inner">
            <h1>${this._headerText}</h1>
        </div>
    </div>`;
  }

  render() {
    this.innerHTML = `
            <div class="appbar scrolled" id="appbar">
                <button id="drawer-open" class="header__button" aria-label="navigation menu">
                    <i class="material-icons">menu</i>
                </button>
                <div class="header__inner">
                    <h1>DIGINAS MTsN 2 Jember</h1>
                </div>
                <nav id="drawer" class="nav">
                    <ul class="nav__list" aria-label="navigation menu">
                        <li class="nav__item show-mobile-only center-text">
                            <button id="drawer-close" class="header__button" 
                            aria-label="close navigation menu" accesskey="c">
                                <i class="material-icons">north_west</i>
                            </button>
                        </li>
                        <li class="nav__item">
                            <a href="#/home" aria-label="Home" accesskey="h">
                                <i class="material-icons show-mobile-tab-only">home</i>
                                <div class="hide-tab-only">Home</div>
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="#/histori" aria-label="Riwayat Penilaian" accesskey="f">
                                <i class="material-icons show-mobile-tab-only">history</i>
                                <div class="hide-tab-only">Riwayat Penilaian</div>
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="#/profil" aria-label="Sesuaikan Data" accesskey="f">
                                <i class="material-icons show-mobile-tab-only">portrait</i>
                                <div class="hide-tab-only">Sesuaikan Data</div>
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="#/changepass" aria-label="Ubah Password" accesskey="f">
                                <i class="material-icons show-mobile-tab-only">lock_outline</i>
                                <div class="hide-tab-only">Ubah Password</div>
                            </a>
                        </li>
                        <li class="nav__item">
                            <a href="#/" id="logout" aria-label="close" accesskey="f">
                                <i class="material-icons show-mobile-tab-only">exit_to_app</i>
                                <div class="hide-tab-only">Keluar Akun</div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>`;
  }
}
customElements.define('app-bar', AppBar);
