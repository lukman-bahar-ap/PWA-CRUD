import IMG from '../../../../globals/assets';

class dashboardCard extends HTMLElement {
  connectedCallback() {
    this._dashboard = {
      countFinished: 0, maxPengetahuan: 0, maxKeterampilan: 0, countRemidi: 0, countRemidiEver: 0,
    };
    this.render();
  }

  set setDataDashboard(dashboard) {
    this._dashboard = dashboard;
    this.render();
  }

  render() {
    const {
      countFinished, maxPengetahuan, maxKeterampilan, countRemidi, countRemidiEver,
    } = this._dashboard;

    this.innerHTML = `
            <h2 class="category__title">Rekapitulasi</h2>
            <div class="card-horizontal">
                <button type="button" class="category-item bg-gradient-primary" 
                    id="ShowAll" 
                    title="Jumlah Materi Terselesaikan"
                    aria-label="Klik untuk melihat Detail">

                        <img src="${IMG.CIRCLE}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Terselesaikan
                        </div>
                        <div class="category__value">${countFinished}</div>
                        <div class="category__content">Materi</div>

                </button>
                <button type="button" class="category-item bg-gradient-secondary" 
                    id="ShowMaxtRate" 
                    title="Nilai Tertinggimu di Pengetahuan"
                    aria-label="klik untuk melihat detail">

                        <img src="${IMG.CIRCLE}" class="card-img-absolute" alt="">
                        <div class="category__content">
                        Nilai Tertinggi
                        </div>
                        <div class="category__value">${maxPengetahuan}</div>
                        <div class="category__content">Pd Pengetahuan</div>

                </button>
                <button type="button" class="category-item bg-gradient-third" 
                    id="ShowAverage" 
                    title="Nilai Teritinggimu di Keterampilan"
                    aria-label="Klik untuk melihat detail">

                        <img src="${IMG.CIRCLE}" class="card-img-absolute" alt="">
                        <div class="category__content">
                        Nilai Tertinggi
                        </div>
                        <div class="category__value">${maxKeterampilan}</div>
                        <div class="category__content">Pd Keterampilan</div>

                </button>
                <button type="button" class="category-item bg-gradient-fourth" 
                    id="ShowFavorite"
                    title="Remidi Saat Ini"
                    aria-label="Klik untuk informasi detail">

                        <img src="${IMG.CIRCLE}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Remidi pada
                        </div>
                        <div class="category__value">${countRemidi}</div>
                        <div class="category__content">Materi saat ini</div>

                </button>
                <button type="button" class="category-item bg-gradient-fiveth" 
                    id="ShowAllCity" 
                    title="Jumlah Pernah Remidi"
                    aria-label="Klik untuk melihat detail">

                        <img src="${IMG.CIRCLE}" class="card-img-absolute" alt="">
                        <div class="category__content">
                            Pernah Remidi Di
                        </div>
                        <div class="category__value">${countRemidiEver}</div>
                        <div class="category__content">Materi</div>

                </button>
            </div>
        `;
  }
}

customElements.define('dashboard-card', dashboardCard);
