import IMG from '../../../../globals/assets';

class KrsHeadElement extends HTMLElement {
  connectedCallback() {
    this._head = {
      nama: '-', nisn: 0, kelas: 0, tahunMasuk: 0, tahunAjar: 0, semester: 0,
    };
    this.render();
  }

  set head(head) {
    this._head = head;
    this.render();
  }

  render() {
    const {
      nama, nisn, kelas, tahunMasuk, tahunAjar, semester,
    } = this._head;

    this.innerHTML = `
    <div class="hero-item">
      <img class="hero-item__thumbnail lazyload"
      data-src="${IMG.HERO}"
      alt="hero picture" crossorigin="anonymous">
      <div class="hero-item__card-img"></div>
      
      <div class="hero-item__content">
          <div class="hero-item__title">
              ${nama}
              <p class="hero-item__description">NISN : ${nisn}</p>
          </div>
          <div class="hero-item__kolom4">

            <div>Kelas </div><div> : ${kelas} </div>
            <div>Semester </div><div> : ${semester} </div>
            <div>Tahun Masuk </div><div> : ${tahunMasuk} </div>
            <div>Tahun Ajar </div><div> : ${tahunAjar} </div>

          </div>
      </div>
    </div>`;
  }
}
customElements.define('krs-head', KrsHeadElement);
