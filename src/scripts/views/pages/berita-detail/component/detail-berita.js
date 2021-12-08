import IMG from '../../../../globals/assets';
import CONFIG from '../../../../globals/config';

class DetailBerita extends HTMLElement {
  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  render() {
    const {
      TGL, JUDUL, ISI, PENULIS, LINK_FILE_1,
    } = this._detail;

    this.innerHTML = `
        <article class="resto">
            <div class="detail-item">
                <img class="detail-item__poster detail-item__card-img"
                src="${LINK_FILE_1 ? CONFIG.BASE_IMAGE_URL + LINK_FILE_1 : IMG.IMG_BROKEN}"
                alt="${JUDUL}" crossorigin="anonymous"> 
                 
                <div class="detail__information">
                <h3 class="detail__header">${JUDUL}</h3>
                    <p class="detail-item__information">
                      <i class="material-icons">date_range</i> ${TGL} 
                      <i class="material-icons pl-low">edit</i> 
                      <span class="detail-item__category">${PENULIS}</span>
                    </p>
               </div>
            </div>
            <div class="resto__description">
                <h3 class="detail__header">Deskripsi</h3>
                <p>${ISI}</p>
            </div>              
        </article>
        `;
  }
}

customElements.define('detail-berita', DetailBerita);
