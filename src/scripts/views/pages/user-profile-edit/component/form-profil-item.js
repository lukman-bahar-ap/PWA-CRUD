class FormProfilItem extends HTMLElement {
  // /**
  //  * @param {any} event
  //  */
  // set clickEvent(event) {
  //   this._clickEvent = event;
  //   this.render();
  // }

  set parcelForm(parcel) {
    this._parcel = parcel;
    this.render();
  }

  get value() {
    return this.querySelector('#reqPenyesuaian').value;
  }

  render() {
    const { TITLE, VALUE } = this._parcel;
    this.innerHTML = `
      <div class="container_form">
        <div class="form_group">
          ${TITLE}
        </div>
        <div class="form_group">
          <input type="text" value="${VALUE}" id="reqPenyesuaian"
          aria-label="Ketik Perubahan Data" placeholder="${TITLE}">
        </div>
        <div class="form_group">

          <button class="submit__button" id="btnPenyesuaian"  
          aria-label="Klik untuk melaporkan penyesuaian data">
            Kirim
          </button>

        </div>
      </div>`;

    // this.querySelector('#btnSubmit').addEventListener('click', this._clickEvent);
  }
}
customElements.define('form-profil-item', FormProfilItem);
