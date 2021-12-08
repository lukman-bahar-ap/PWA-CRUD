const assert = require('assert');

Scenario('searching favorite restaurant', async ({ I }) => {
  I.see('You do not have favorite restaurant saved', 'resto-list');

  I.amOnPage('/');

  I.seeElement('.discover-item__title a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.discover-item__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    names.push(await I.grabTextFrom('.detail-resto__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/fav');
  I.seeElement('#searchElement');

  const searchQuery = names[1].substring(1, 4);
  const matchingResto = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#searchElement', searchQuery);
  I.seeElement('#searchButtonElement');
  I.click('#searchButtonElement');

  const visibleLikedRestoes = await I.grabNumberOfVisibleElements('.discover-item__title');
  assert.strictEqual(matchingResto.length, visibleLikedRestoes);

  matchingResto.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.discover-item__title').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});
