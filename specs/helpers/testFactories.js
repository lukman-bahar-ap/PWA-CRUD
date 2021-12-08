import LikeButtonPresenter from '../../src/scripts/views/pages/detail/utility/like-button-presenter';
import DiginasIdb from '../../src/scripts/data/diginas-idb';
import launchToast from '../../src/scripts/utils/toast';

const createLikeButtonPresenterWithResto = async (resto) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestoes: DiginasIdb,
    resto,
    notification: launchToast,
  });
};

export { createLikeButtonPresenterWithResto };
