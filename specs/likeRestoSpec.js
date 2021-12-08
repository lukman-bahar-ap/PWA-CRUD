import DiginasIdb from '../src/scripts/data/diginas-idb';
import * as TestFactories from './helpers/testFactories';
import launchToast from '../src/scripts/utils/toast';

describe('Liking A resto', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = `<div id="likeButtonContainer"></div>
    <div id="toast">
      <div id="icon-toast">Icon</div>
      <div id="msg-toast">notification</div>
    </div>`;
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the resto', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await DiginasIdb.getResto(1);

    expect(resto).toEqual({ id: 1 });
    DiginasIdb.deleteResto(1);
    launchToast.init({
      icon: '<i class="large material-icons">delete</i>',
      msg: 'deleted from favorite :(',
    });
  });

  it('should not add a resto again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await DiginasIdb.putResto({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await DiginasIdb.getAllRestoes()).toEqual([{ id: 1 }]);

    DiginasIdb.deleteResto(1);
    launchToast.init({
      icon: '<i class="large material-icons">favorite</i>',
      msg: 'added to favorite',
    });
  });

  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await DiginasIdb.getAllRestoes()).toEqual([]);
  });
});
