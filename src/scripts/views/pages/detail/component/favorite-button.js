const createLikeButton = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="large material-icons">favorite_border</i>
  </button>
`;

const createLikedButton = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="large material-icons">favorite</i>
  </button>
`;

export { createLikeButton, createLikedButton };
