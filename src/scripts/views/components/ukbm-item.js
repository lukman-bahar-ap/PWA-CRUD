class UkbmItem extends HTMLElement {
  set ukbm(ukbm) {
    this._ukbm = ukbm;
    this.render();
  }

  _calculatePresentase(TOTAL_KD, FINISH_KD) {
    this.jmlSeluruh = TOTAL_KD;
    this.jmlBagian = FINISH_KD;
    // PERSENTASE
    const PERSENTASE = (this.jmlSeluruh > 0 || this.jmlBagian > 0)
      ? ((this.jmlBagian / this.jmlSeluruh) * 100) : 0;
    // CHECK IF DECIMAL THEN USE 1 NUMBER DECIMAL, EXAMPLE = 33.3
    return (PERSENTASE % 1 !== 0 || PERSENTASE !== 0) ? PERSENTASE.toFixed(1) : PERSENTASE;
  }

  _addClassProgress(value) {
    this.value = value;
    // add css class if have an study progress
    if (this.value !== 0) {
      return (this.value >= 100) ? 'w3-finish' : 'w3-oren';
    }
    return '';
  }

  render() {
    const {
      KRS_ID, NAMA_MAPEL, TOTAL_KD, FINISH_KD,
    } = this._ukbm;

    const PERSENTASE = this._calculatePresentase(TOTAL_KD, FINISH_KD);
    const CLASS_PROGRESS_BAR = this._addClassProgress(PERSENTASE);
    const KETERANGAN = PERSENTASE === 100 ? `Tuntas (${TOTAL_KD} Materi)` : `${FINISH_KD} Materi diselesaikan dari ${TOTAL_KD} Materi`;
    this.innerHTML = `
      <div class="discover-item__content">
          <h3 class="discover-item__title">
              <a href="/#/detail/${KRS_ID}" aria-label="klik untuk melihat detail">
                  ${NAMA_MAPEL}
              </a>
          </h3>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-container ${CLASS_PROGRESS_BAR} w3-round-xlarge" style="width:${PERSENTASE}%;">
                ${PERSENTASE}%
            </div>
          </div>
          <p class="discover-item__description">${KETERANGAN}</p>
      </div>
    `;
  }
}

customElements.define('ukbm-item', UkbmItem);
