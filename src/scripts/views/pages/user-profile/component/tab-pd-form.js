import '../../../../../styles/tab-card.scss';

class tabCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `

            <div class="tab-card">
                <button type="button" class="tab-item" 
                    id="btnPersonal" 
                    title="Personal"
                    aria-label="Klik untuk melihat">

                        <div class="tab__content">
                            Personal
                        </div>

                </button>
                <button type="button" class="tab-item" 
                    id="btnImunisasi" 
                    title="Imunisasi"
                    aria-label="Click to show popular restaurant">
  
                        <div class="tab__content">
                        Imunisasi
                        </div>

                </button>
                <button type="button" class="tab-item" 
                    id="btnKeluarga" 
                    title="Keluarga"
                    aria-label="Click to show restaurant by average rate">

                        <div class="tab__content">
                        Keluarga
                        </div>

                </button>
                <button type="button" class="tab-item" 
                    id="btnSekolahSebelumnya"
                    title="Sekolah Sebelumnya"
                    aria-label="Click to show your favorite">
          
                        <div class="tab__content">
                            Sekolah Sebelumnya
                        </div>

                </button>
                <button type="button" class="tab-item" 
                    id="btnTmptTinggal" 
                    title="Tempat Tinggal"
                    aria-label="Click to show all restaurant from count by city">
    
                        <div class="tab__content">
                            Tempat Tinggal 
                        </div>

                </button>
            </div>
        `;
  }
}

customElements.define('tab-card', tabCard);
