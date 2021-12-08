import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';
import DiginasIdb from '../src/scripts/data/diginas-idb';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await DiginasIdb.getAllRestoes()).forEach(async (resto) => {
      await DiginasIdb.deleteResto(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(DiginasIdb);
});
