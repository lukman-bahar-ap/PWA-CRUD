class HistoriItem extends HTMLElement {
  set nilai(data) {
    this._nilai = data.nilai;
    this._kkm = data.kkm;
    this.render();
  }

  _checkNilai(NILAI, REMIDI) {
    this.NILAI = NILAI;
    this.REMIDI = REMIDI;
    let nilaiPengetahuan = '';
    if (this.NILAI >= this._kkm) {
      nilaiPengetahuan = `<p class="nilai lulus">${this.NILAI}</p>`;
    } else {
      nilaiPengetahuan = `<p class="nilai remidi">${this.NILAI}</p>`;
    }

    if (this.REMIDI >= this._kkm) {
      nilaiPengetahuan = `<p class="nilai lulus">
          <span class="nilai__with-remidial">${this.NILAI}</span>
          ${this.REMIDI}
          </p>`;
    } else if (this.REMIDI > 0 && this.REMIDI < this._kkm) {
      nilaiPengetahuan = `<p class="nilai remidi">
          <span class="nilai__with-remidial">${this.NILAI}</span>
          ${this.REMIDI}
          </p>`;
    }
    return nilaiPengetahuan;
  }

  _checkFeedback(FEEDBACK_NP, FEEDBACK_NK) {
    this.FEEDBACK_NP = FEEDBACK_NP;
    this.FEEDBACK_NK = FEEDBACK_NK;
    let f = '';
    if (this.FEEDBACK_NP !== null && this.FEEDBACK_NK !== null) {
      f = '<h2 class="feedback">Feedback</h2>';
      f = (this.FEEDBACK_NP !== null) ? `${f}<div class="nilai_feedback">
      <p class="nilai_feedback__titile">
        <i class="material-icons pr-low">person</i> Pengetahuan
      </p>
      <p class="nilai_feedback__desc">${this.FEEDBACK_NP}</p>
    </div>`
        : f;
      f = (this.FEEDBACK_NK !== null) ? `${f}<div class="nilai_feedback">
      <p class="nilai_feedback__titile">
        <i class="material-icons pr-low">person</i> Keterampilan
      </p>
      <p class="nilai_feedback__desc">${this.FEEDBACK_NK}</p>
    </div>`
        : f;
    }
    return f;
  }

  render() {
    const {
      NAMA_KD, NAMA_MAPEL,
      NILAI_PENGETAHUAN, REMIDIAL_NP, FEEDBACK_NP,
      NILAI_KETERAMPILAN, REMIDIAL_NK, FEEDBACK_NK,
    } = this._nilai;

    const templateNilaiPengetahuan = this._checkNilai(NILAI_PENGETAHUAN, REMIDIAL_NP);
    const templateNilaiKeterampilan = this._checkNilai(NILAI_KETERAMPILAN, REMIDIAL_NK);
    const templateFeedback = this._checkFeedback(FEEDBACK_NP, FEEDBACK_NK);

    this.innerHTML = `
        <div class="container left">
          <div class="content-box">
            <h2>${NAMA_MAPEL}</h2>
            <h3 class="content-box-item__title">${NAMA_KD}</h3>

              <div class="grid__nilai">
                <div class="right-border">
                  <p><b>Pengetahuan</b></p> 
                  ${templateNilaiPengetahuan}
                </div>   
                <div>
                  <p><b>Keterampilan</b></p> 
                  ${templateNilaiKeterampilan}
                </div>    
              </div>
              ${templateFeedback}
          </div>

        </div>`;
  }
}

customElements.define('histori-item', HistoriItem);
