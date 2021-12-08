class KrsItem extends HTMLElement {
  set ukbm(ukbm) {
    this._ukbm = ukbm;
    this.render();
  }

  render() {
    const {
      KODE_KD_UKBM, NAMA_MAPEL, BEBAN_BELAJAR,
    } = this._ukbm;

    this.innerHTML = `
      <div class="discover-item__content">
          <h3 class="title_card">
              ${NAMA_MAPEL}
          </h3>
          <p class="discover-item__description">${KODE_KD_UKBM} <span class="item_right"> Beban : ${BEBAN_BELAJAR} </span></p>
      </div>
    `;
  }
}

customElements.define('krs-item', KrsItem);
