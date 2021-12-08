import '../../components/ukbm-list';
import '../../components/search-bar';
import DiginasIdb from '../../../data/diginas-idb';

const Favorite = {
  async init() {
    this.restoListElement = document.querySelector('resto-list');
    this.searchElement = document.querySelector('search-bar');
    this.searchElement.headerTitle = 'Your Favorites';
  },

  async render() {
    return `
    <section class="content latest">
      <search-bar></search-bar>
      <resto-list class="posts"></resto-list>
    </section>
      `;
  },

  async afterRender() {
    await this.init();

    const data = await DiginasIdb.getAllRestoes();
    await this.showFavoriteToList(data, 'You do not have favorite restaurant saved');
    await this.searchButton(data);
  },

  async searchButton(data) {
    const favoriteSearch = async () => {
      const filterResto = await DiginasIdb.getByName(data, this.searchElement.value);
      this.showFavoriteToList(
        filterResto,
        'not found from your favorites',
        this.searchElement.value,
      );
    };

    this.searchElement.clickEvent = favoriteSearch;
  },

  async showFavoriteToList(data, error, keyword = '') {
    if (data.length > 0) {
      this.restoListElement.restoes = data;
    } else {
      this.restoListElement.renderError(`${keyword} ${error}`);
    }
  },

};

export default Favorite;
