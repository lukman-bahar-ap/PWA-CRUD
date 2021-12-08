import IMG from '../../globals/assets';
import CONFIG from '../../globals/config';

class BeritaItem extends HTMLElement {
  set berita(berita) {
    this._berita = berita;
    this.render();
  }

  render() {
    const {
      BERITA_ID, TGL, JUDUL, LINK_FILE_1,
    } = this._berita;

    this.innerHTML = `
      <img class="viral-item__thumbnail lazyload"
      data-src="${LINK_FILE_1 ? CONFIG.BASE_IMAGE_URL_SMALL + LINK_FILE_1 : IMG.IMG_BROKEN}"
      alt="${JUDUL}" crossorigin="anonymous">
      
      <div class="viral-item__content">
          <h3 class="discover-item__title">
              <a href="${`/#/beritadetail/${BERITA_ID}`}" aria-label="${JUDUL} click to view content">
                  ${JUDUL}
              </a>
          </h3>
          <p class="viral-item__description"><i class="material-icons">date_range</i> ${TGL}</p>
      </div>
    `;
  }
}

customElements.define('berita-item', BeritaItem);
