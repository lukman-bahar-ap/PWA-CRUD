class ProfilItem extends HTMLElement {
  set profil(profil) {
    this._profil = profil;
    this.render();
  }

  _editableField(FIELD) {
    this.FIELD = FIELD;
    return !!((
      this.FIELD !== 'NAMA_KELAS' && this.FIELD !== 'NISN' && this.FIELD !== 'NIS_LOKAL'
      && this.FIELD !== 'NO_ABSEN' && this.FIELD !== 'TAHUN_MASUK' && this.FIELD !== 'TGL_MASUK_MADRASAH'
      && this.FIELD !== 'JENJANG' && this.FIELD !== 'NPSN' && this.FIELD !== 'NAMA_SEKOLAH'
      && this.FIELD !== 'STATUS_SEKOLAH' && this.FIELD !== 'NO_PESERTA_UN' && this.FIELD !== 'NO_IJASAH' && this.FIELD !== 'NO_SKHUN'
    ));
  }

  render() {
    const { TITLE, FIELD, VALUE } = this._profil;
    // const editLink = `&nbsp;
    //   <button type="button"
    //   data-title="${TITLE}"
    //   data-field="${FIELD}"
    //   data-value="${VALUE}"
    //   aria-label="klik untuk melihat mengubah"
    //   id="btnPenyesuaian">
    //     <i class="material-icons pl-low" >edit</i>
    //   </button>`;
    const editLink = `&nbsp;
      <a href="/#/penyesuaian/${FIELD}" aria-label="klik untuk melihat mengubah">
        <i class="material-icons pl-low">edit</i>
      </a>`;
    const editIcon = (this._editableField(FIELD)) ? editLink : '';
    this.innerHTML = `
        <div class="box__card">
            <p class="box-name" id="${FIELD}">
              ${TITLE}
              ${editIcon}
            </p>
            <p class="box-body">${VALUE}</p>
        </div>
    `;
    // if (this.querySelector('#btnPenyesuaian') !== null) {
    //   this.querySelector('#btnPenyesuaian').addEventListener('click', async (e) => {
    //     const cek = e.target.getAttribute('data-title');
    //     this.alert(`test${cek}`);
    //   }, false);
    // }
  }
}

customElements.define('profil-item', ProfilItem);
