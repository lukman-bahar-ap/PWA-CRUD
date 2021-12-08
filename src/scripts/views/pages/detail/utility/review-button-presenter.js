const ReviewButtonPresenter = {
  async init({
    id, name, review, list, reviewSource,
  }) {
    this._id = id;
    this._name = name;
    this._review = review;
    this._list = list;
    this._reviewSource = reviewSource;
    await this.insertToPageBeforeSend();
  },

  async insertToPageBeforeSend() {
    const dataInput = {
      id: this._id,
      name: this._name,
      review: this._review,
      date: 'sending...',
    };
    // insert review to page, paralel for sending to server
    this._list.newReview = dataInput;

    delete dataInput.date; // property date not use in sendreview
    await this.sendReview(dataInput);
  },

  async sendReview(dataInput) {
    try {
      const data = await this._reviewSource.sendReview(dataInput);
      this._list.reviews = data;
    } catch (message) {
      this._list.renderError(message);
    }
  },

};

export default ReviewButtonPresenter;
