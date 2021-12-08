import IMG from '../../../../globals/assets';
import CONFIG from '../../../../globals/config';

class DetailResto extends HTMLElement {
  set detail(detail) {
    this._detail = detail;
    this.render();
  }

  render() {
    const {
      name,
      pictureId,
      rating,
      city,
      address,
      categories,
      menus,
      description,
    } = this._detail;

    this.innerHTML = `
        <article class="resto">
            <div class="detail-item">
                <img class="detail-item__poster detail-item__card-img"
                src="${pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + pictureId : IMG.NOT_FOUND}"
                alt="${name}" crossorigin="anonymous"> 
                 
                <div class="detail__information">
                <h3 class="detail__header">Informations</h3>
                    
                    <div class="detail-resto__name">
                    ${name}
                    </div>
                    <p class="detail-item__information">
                      <i class="material-icons">star</i> ${rating} 
                      <i class="material-icons pl-low">location_on</i> 
                      ${city}, ${address}
                    </p>
                    <p class="detail-item__information">
                      <b>
                        Category : ${categories.map((category) => `<span class="detail-item__category">${category.name}</span>`).join('')}
                      </b>
                    </p>
               </div>
            </div>

            <div>
            <h3 class="detail__header">Menus</h3>
              <div class="detail__menu">
                <div>
                  <h4><i class="material-icons pr-low">restaurant</i> Food Menus</h4>
                  <ul>
                  ${menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <h4><i class="material-icons pr-low">local_cafe</i> Drink Menus</h4>
                  <ul>
                  ${menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
            <div class="resto__description">
                <h3 class="detail__header">Description</h3>
                <p>${description}</p>
            </div>              
        </article>
        `;
  }
}

customElements.define('detail-resto', DetailResto);
