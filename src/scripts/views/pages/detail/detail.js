import './component/detail-resto';
import './component/review-form';
import './component/review-list';
import UrlParser from '../../../routes/url-parser';
import LikeButtonPresenter from './utility/like-button-presenter';
import DiginasIdb from '../../../data/diginas-idb';
import RestoSource from '../../../data/resto-source';
import launchToast from '../../../utils/toast';

const Detail = {
  async init() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.id = url.id;

    this.restoElement = document.querySelector('detail-resto');
    this.reviewListElement = document.querySelector('review-list');
    this.inputName = document.querySelector('#inputName');
    this.inputReview = document.querySelector('#inputReview');
    this.btnSubmit = document.querySelector('#submitReview');
    this.btnClose = document.querySelector('#previousPage');
  },
  async render() {
    return `
        <section class="content">
          <h2 class="detail__title">
            <a href="#" id="previousPage" aria-label="back to previeus page"
            accesskey="b" class="back-button">
              <i class="large material-icons">keyboard_backspace</i>
            </a>
            Detail Resto
          </h2>
          <detail-resto></detail-resto>
          <div id="likeButtonContainer"></div>
        </section>
      `;
  },

  async afterRender() {
    await this.init();
    await this.isLoaded();
  },

  async loadDatailResto(resto) {
    this.restoElement.detail = resto;
    this.reviewListElement.reviews = resto.customerReviews;

    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestoes: DiginasIdb,
      resto,
      notification: launchToast,
    });

    this.btnSubmit.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.submitReview();
    });

    this.btnClose.addEventListener('click', () => {
      window.history.go(-1);
    });
  },

  async submitReview() {
    if (this.isRequiered()) {
      const reviewButtonPresenter = await import('./utility/review-button-presenter')
        .then((module) => module.default)
        .then((ReviewButtonPresenter) => ReviewButtonPresenter)
        .catch((error) => new Error(error));

      await reviewButtonPresenter.init({
        id: this.id,
        name: this.inputName.value,
        review: this.inputReview.value,
        list: this.reviewListElement,
        reviewSource: RestoSource,
      });
      return this.clearInput();
    }
    return launchToast.init({
      icon: '<i class="material-icons pr-low">keyboard</i>',
      msg: 'all fill required',
    });
  },

  async loadImg() {
    return import('../../../globals/assets')
      .then((module) => module.default)
      .then((IMG) => IMG)
      .catch((error) => new Error(error));
  },

  async isLoaded() {
    const data = await this.getDetailResto(this.id);
    if (data) {
      await this.loadDatailResto(data);
    } else {
      const IMG = await this.loadImg();
      document.querySelector('#main-content').innerHTML = `<img width="100%" 
      src="${IMG.CIRCLE}" alt="connection error, try again later" class="lazyload">`;
    }
  },

  isRequiered() {
    return !(this.inputName.value === '' || this.inputReview.value === '');
  },

  clearInput() {
    this.inputName.value = '';
    this.inputReview.value = '';
  },

  async getDetailResto(id) {
    const resto = await this.getFromFavorite(id);
    if (resto) {
      return resto;
    }
    return this.getFromSource(id);
  },

  async getFromSource(id) {
    try {
      const resto = await RestoSource.detail(id);
      return resto;
    } catch {
      return false;
    }
  },

  async getFromFavorite(id) {
    const resto = await DiginasIdb.getResto(id);
    return resto || false;
  },
};

export default Detail;
