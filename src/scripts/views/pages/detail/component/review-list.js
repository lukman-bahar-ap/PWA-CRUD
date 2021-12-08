import './review-item';

class ReviewList extends HTMLElement {
  set reviews(reviews) {
    this._reviews = reviews;
    this.render();
  }

  set newReview(newReview) {
    this._newReview = newReview;
    this.renderPost();
  }

  renderError(message) {
    this.innerHTML = `<h2>${message}</h2>`;
  }

  render() {
    this.innerHTML = '';

    this._reviews.forEach((review) => {
      const reviewItemElement = document.createElement('review-item');
      reviewItemElement.review = review;
      this.appendChild(reviewItemElement);
    });
  }

  renderPost() {
    const reviewItemElement = document.createElement('review-item');
    reviewItemElement.review = this._newReview;
    this.appendChild(reviewItemElement);
  }
}

customElements.define('review-list', ReviewList);
