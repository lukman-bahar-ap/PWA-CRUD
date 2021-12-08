const assert = require('assert');

Feature('Like - Unlike Resto');

Before(({ I }) => {
  I.amOnPage('/#/fav');
});

Scenario('showing empty liked restaurants', async ({ I }) => {
  I.seeElement('#searchElement');
  I.see('You do not have favorite restaurant saved', 'resto-list');
});

Scenario('Like and then unlike this restaurants', async ({ I }) => {
  I.see('You do not have favorite restaurant saved', 'resto-list');
  I.amOnPage('/');

  I.seeElement('.discover-item__title a');
  const firstResto = locate('.discover-item__title a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/fav');
  I.seeElement('resto-item');

  const likedRestoName = await I.grabTextFrom('.discover-item__title');

  assert.strictEqual(firstRestoName, likedRestoName);

  I.seeElement('.discover-item__title a');
  I.click(locate('.discover-item__title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/fav');
  I.see('You do not have favorite restaurant saved', 'resto-list');
});
