class ReviewItem extends HTMLElement {
  set review(review) {
    this._review = review;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="review__card">
            <p class="review-name">
              <i class="material-icons pr-low">person</i>${this._review.name}
            </p>
            <p class="review-body">${this._review.review}</p>
            <p class="review-date">${this._review.date}</p>
        </div>
    `;
  }
}

customElements.define('review-item', ReviewItem);
