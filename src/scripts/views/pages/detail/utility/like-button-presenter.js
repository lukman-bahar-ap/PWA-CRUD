import { createLikeButton, createLikedButton } from '../component/favorite-button';

const LikeButtonPresenter = {
  async init({
    likeButtonContainer, favoriteRestoes, resto, notification,
  }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
    this._favoriteRestoes = favoriteRestoes;
    this._notification = notification;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const resto = await this._favoriteRestoes.getResto(id);
    return !!resto;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestoes.putResto(this._resto);
      this._renderButton();

      this._notification.init({
        icon: '<i class="large material-icons">favorite</i>',
        msg: 'added to favorite',
      });
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButton();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestoes.deleteResto(this._resto.id);
      this._renderButton();

      this._notification.init({
        icon: '<i class="large material-icons">delete</i>',
        msg: 'deleted from favorite :(',
      });
    });
  },
};

export default LikeButtonPresenter;
