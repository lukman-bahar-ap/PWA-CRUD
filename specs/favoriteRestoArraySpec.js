import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteRestoes = [];

const FavoriteRestoArray = {

  getResto(id) {
    if (!id) {
      return false;
    }

    return favoriteRestoes.find((resto) => resto.id === id);
  },

  getAllRestoes() {
    return favoriteRestoes;
  },

  putResto(resto) {
    if (!resto.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestoes
    if (this.getResto(resto.id)) {
      return;
    }

    favoriteRestoes.push(resto);
  },

  deleteResto(id) {
    // cara boros menghapus resto dengan meng-copy resto yang ada
    // kecuali resto dengan id == id
    favoriteRestoes = favoriteRestoes.filter((resto) => resto.id !== id);
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestoes = []);

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
