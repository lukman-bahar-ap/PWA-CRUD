const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');
  I.seeElement('.discover-item__title a');

  const selectfirstResto = locate('.discover-item__title a').first();
  I.click(selectfirstResto);
});

Scenario('Submit button without fill form review', async ({ I }) => {
  I.seeElement('.review__form');
  I.seeElement('#submitReview');

  I.click(locate('#submitReview'));

  I.seeElement('#msg-toast');
});

Scenario('Review with fill all field', async ({ I }) => {
  I.seeElement('.review__form');

  const reviewText = 'test review menggunakan e2e';
  I.fillField('#inputReview', reviewText);
  I.fillField('#inputName', 'from diresto');
  I.seeElement('#submitReview');
  I.click(locate('#submitReview'));

  I.seeElement('.review-body');
  const lastReview = locate('.review-body').last();
  const submitedReview = await I.grabTextFrom(lastReview);
  assert.strictEqual(submitedReview, reviewText);
});
