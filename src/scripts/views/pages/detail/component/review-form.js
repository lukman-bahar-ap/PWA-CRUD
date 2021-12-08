class ReviewFormElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h3 class="detail__header">Reviews</h3>
      <form class="review__form">
        <div class="review-container">

          <label for="inputReview">Your Review :</label>
          <textarea id="inputReview" name="inputReview" rows="4" width="100%"
          aria-label="Input your review restaurant"  placeholder="Fill required"></textarea>

        </div>
        <div class="review-container">

          <label for="inputName">Name</label>
          <input type="text" id="inputName" name="inputName" 
          aria-label="Please input your name in here" placeholder="Fill required">

        </div>
        <div class="review-container">

          <button class="review__button" id="submitReview" type="submit" 
          aria-label="Click to show all discovery restaurant">
              Submit
          </button>

        </div>
      </form>
    `;
  }
}
customElements.define('review-form', ReviewFormElement);
