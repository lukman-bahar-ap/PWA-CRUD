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
                <div class="header__inner">
                    <h1>BASE Project</h1>
                </div>
            </div>`;
  }
}
customElements.define('app-bar', AppBar);
