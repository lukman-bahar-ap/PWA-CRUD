class UkbmItem extends HTMLElement {
  set ukbm(ukbm) {
    this._ukbm = ukbm;
    this.render();
  }

  render() {
    const {
      TGL_TIKET, NO_TIKET, STATUS, KELUHAN,
    } = this._ukbm;

    this.innerHTML = `
      <div class="discover-item__content">
          <h3 class="discover-item__title">
              <a href="/#/detail/${NO_TIKET}" aria-label="klik untuk melihat detail">
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
