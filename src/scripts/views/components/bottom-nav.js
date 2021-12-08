class BottomNav extends HTMLElement {
  connectedCallback() {
    // this._badge = '';
    this.render();
  }

  unRender() {
    this.innerHTML = '';
  }

  set withNotif(badge) {
  // this._badge = badge;
    this.render();
  }

  render() {
    // const addBadge = this._badge > 0 ? 'show-mobile-tab-only badge-notif' : '';

    this.innerHTML = `
    <div class="bottom-nav">
        <div class="bottom-link-nav">
            <a href="#/home">
            <i class="material-icons show-mobile-tab-only">home</i>
                <div>Home</div>
            </a>
            <a href="#/ukbm">
            <i class="material-icons show-mobile-tab-only">assignment</i>
                <div>Nilai</div>
            </a>
            <a href="#/notif">
                 <span class="material-icons" data-badge="1" id="msgSpan">message</span>
                 <div>Pesan</div>
            </a>
        </div>
    </div>`;
  }
}
customElements.define('bottom-nav', BottomNav);
