import IMG from '../../../../globals/assets';

class HeroElement extends HTMLElement {
  connectedCallback() {
    this._dashboard = {
      name: '-', nisn: 0, semester: 0, kelas: 0, presentage: 0,
    };
    this.render();
  }

  set dashboard(dashboard) {
    this._dashboard = dashboard;
    this.render();
  }

  render() {
    const {
      name, nisn, semester, kelas, presentage,
    } = this._dashboard;

    const presentageBar = presentage.toFixed();
    const presentageView = presentage.toFixed(1);

    this.innerHTML = `
    <div class="hero-item">
      <img class="hero-item__thumbnail lazyload"
      data-src="${IMG.HERO}"
      alt="hero picture" crossorigin="anonymous">
      <div class="hero-item__card-img"></div>
      
      <div class="hero-item__content">
          <div class="hero-item__title">
              ${name}
              <p class="hero-item__description">NISN : ${nisn}</p>
          </div>
          <div class="hero-item__progress">

            <div>
              <p><b>Pencapaian belajar</b></p> 
              <p>pada semester ${semester} </p>
              <p>kelas : ${kelas} </p>
              <p class="hero-item__history">
                  <a href="#/histori" aria-label="Riwayat" accesskey="r">
                    <span class="link-border">
                      Riwayat Nilai
                    </span>
                  </a>
              </p>
            </div>

            <div class="c100 p${presentageBar} small green center" style="margin-top: 16px">
                <span>${presentageView}%</span>
                <div class="slice">
                    <div class="bar"></div>
                    <div class="fill"></div>
                </div>
            </div>

          </div>
      </div>
    </div>`;
  }
}
customElements.define('hero-elm', HeroElement);
