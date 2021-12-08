class App {
  constructor({
    open, close, drawer, otherMenu, content, appbar,
  }) {
    this._open = open;
    this._close = close;
    this._drawer = drawer;
    this._otherMenu = otherMenu;
    this._content = content;
    this._appbar = appbar;

    this._initialAppShell();
  }

  _initialAppShell() {
    import('../utils/drawer-initiator')
      .then((module) => module.default)
      .then((DrawerInitiator) => {
        DrawerInitiator.init({
          open: this._open,
          close: this._close,
          drawer: this._drawer,
          otherMenu: this._otherMenu,
          content: this._content,
        });
      });
  }

  async transactionPage(page) {
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }

  async transparentAppBar(url) {
    window.scrollTo(0, 0);

    if (url === '/krs' || url === '/home' || url === '/') {
      if (document.querySelector('.scrolled') !== null) {
        this._appbar.classList.remove('scrolled');
      }
    } else if (document.querySelector('.scrolled') === null) {
      this._appbar.classList.add('scrolled');
    }
  }

  async renderPage() {
    const _UrlParser = await import('../routes/url-parser')
      .then((module) => module.default)
      .then((UrlParser) => UrlParser);

    const url = _UrlParser.parseActiveUrlWithCombiner();
    import('../routes/routes')
      .then((module) => module.default)
      .then((Routes) => {
        const page = Routes[url];
        this.transactionPage(page);
        this.transparentAppBar(url);
      })
      .catch((error) => new Error(error));
  }

  async renderPageWithoutUrl(url) {
    const _url = url;
    import('../routes/routes')
      .then((module) => module.default)
      .then((Routes) => {
        const page = Routes[_url];
        this.transactionPage(page);
        this.transparentAppBar(_url);
      })
      .catch((error) => new Error(error));
  }
}

export default App;
