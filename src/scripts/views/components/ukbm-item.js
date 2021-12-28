class UkbmItem extends HTMLElement {
  set ukbm(ukbm) {
    this._ukbm = ukbm.item;
    this._hk = ukbm.hk;
    this.render();
  }

  render() {
    const {
      TGL_TIKET, NO_TIKET, STATUS, KELUHAN,
    } = this._ukbm;

    // url sesuai hak akses
    let alink = 'engineer';
    if (this._hk === '1') {
      alink = 'user';
    } else if (this._hk === '2') {
      alink = 'open';
    } else if (this._hk === '2h') {
      alink = 'helpdesk';
    }

    this.innerHTML = `
      <div class="discover-item__content">
          <h3 class="discover-item__title">
              <a href="/#/${alink}/${NO_TIKET}" aria-label="klik untuk melihat detail">
                  ${NO_TIKET}
              </a>
          </h3>
          <p class="discover-item__description">${STATUS}</p>
          <p class="discover-item__description">${TGL_TIKET}</p>
          <p class="discover-item__description">${KELUHAN}</p>
      </div>
    `;
  }
}

customElements.define('ukbm-item', UkbmItem);
