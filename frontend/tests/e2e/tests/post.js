const path = require("path");


module.exports = {
  'Signup new user for test': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'ShibaInu';
    const password = '123456';

    browser
      .url(`${devServer}`)
      // site header (logo & login button) are correctly shown
      .verify.elementPresent('.site-header__logo')
      .verify.elementPresent('.site-header__status')
      .click('.site-header__status')
      .waitForElementVisible('.ant-modal', 3000)
      // choose signup
      .click('.user-form__button--cancel')
      .setValue('#user-form_username', username)
      .setValue('#user-form_password', password)
      .click('.user-form__button--submit')
      // login button is replaced by the username of the new user
      .waitForElementVisible('.ant-menu-submenu-title a', 3000)
      .verify.containsText('.ant-menu-submenu-title a', username)
      .end();
  },

  'Add new post success': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'ShibaInu';
    const password = '123456';
    const postDescription = 'Nice hill!';

    browser
      .url(`${devServer}`)
      // login the user
      .verify.elementPresent('.site-header__status')
      .click('.site-header__status')
      .waitForElementVisible('.ant-modal', 3000)
      .setValue('#user-form_username', username)
      .setValue('#user-form_password', password)
      .click('.user-form__button--submit')
      .waitForElementVisible('.ant-menu-submenu-title a', 3000)
      .click('.ant-menu-submenu-title a')
      // new user has no posts
      .verify.containsText('#root > .ip-container > div', 'This user doesn\'t have any pictures yet.')
      // add new post
      .waitForElementVisible('.site-header__add-post-btn', 2000)
      .click('.site-header__add-post-btn')
      .setValue('#post-form_description', postDescription)
      .setValue('.avatar-uploader input', path.join(__dirname, '..', 'images/test.jpg'))
      .click('.post-form__button--submit')
      .waitForElementVisible('.ant-message-notice', 3000)
      .verify.containsText('.ant-message-notice span', 'Your post has been successfully submitted!')
      // new post appears in user page
      .elements('css selector','.masonry-image-grid-item', function (result) {
        browser.assert.equal(result.value.length, 1)
      })
      .end();
  },

  'New post at home page success': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const newPostAuthor = 'ShibaInu';
    const newPostDescription = 'Nice hill!';

    browser
      .url(`${devServer}`)
      .waitForElementVisible('.masonry-image-grid-item', 3000)
      .click('.masonry-image-grid-item:first-child')
      .verify.containsText('.masonry-image-grid-item:first-child .masonry-image-grid-item__author a', newPostAuthor)
      .verify.containsText('.masonry-image-grid-item:first-child .masonry-image-grid-item__author > div', newPostDescription)
      .end();
  },

  'Navigate to user page success': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(`${devServer}`)
      // go to user page
      .waitForElementVisible('.masonry-image-grid-item', 3000)
      .click('.masonry-image-grid-item:first-child')
      .click('.masonry-image-grid-item:first-child .masonry-image-grid-item__author a')
      .waitForElementVisible('.masonry-image-grid-item', 3000)
      // Verify amount of post is valid
      .elements('css selector','.masonry-image-grid-item', function (result) {
        browser.assert.equal(result.value.length, 1)
      })
      .end();
  },
};
