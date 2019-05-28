module.exports = {
  'Signup flow success': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'Kangaroo';
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

  'Signup flow with username registered before': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'Kangaroo';
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
      // error message is shown
      .waitForElementVisible('.ant-message-notice', 3000)
      .verify.containsText('.ant-message-notice span', 'The username chosen is taken by other user. Please try another username.')
      .end();
  },

  'Login flow success': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'Kangaroo';
    const password = '123456';

    browser
      .url(`${devServer}`)
      // site header (logo & login button) are correctly shown
      .verify.elementPresent('.site-header__logo')
      .verify.elementPresent('.site-header__status')
      .click('.site-header__status')
      .waitForElementVisible('.ant-modal', 3000)
      // login
      .setValue('#user-form_username', username)
      .setValue('#user-form_password', password)
      .click('.user-form__button--submit')
      // login button is replaced by the username of the logined user
      .waitForElementVisible('.ant-menu-submenu-title a', 3000)
      .verify.containsText('.ant-menu-submenu-title a', username)
      .end();
  },

  'Login flow with incorrect credentials': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'Kangarooo';
    const password = '123456';

    browser
      .url(`${devServer}`)
      // login the user
      .click('.site-header__status')
      .waitForElementVisible('.ant-modal', 3000)
      .setValue('#user-form_username', username)
      .setValue('#user-form_password', password)
      .click('.user-form__button--submit')
      // error message is shown
      .waitForElementVisible('.ant-message-notice', 3000)
      .verify.containsText('.ant-message-notice span', 'Username or password is incorrect.')
      .end();
  },


  'Refresh user success': function test(browser) {
    const devServer = browser.globals.devServerURL;
    const username = 'Kangaroo';
    const password = '123456';

    browser
      .url(`${devServer}`)
      .click('.site-header__status')
      .waitForElementVisible('.ant-modal', 3000)
      // login
      .setValue('#user-form_username', username)
      .setValue('#user-form_password', password)
      .click('.user-form__button--submit')
      // login button is replaced by the username of the logined user
      .waitForElementVisible('.ant-menu-submenu-title a', 3000)
      .verify.containsText('.ant-menu-submenu-title a', username)
      .refresh()
      // verify user is still logged in after refresh
      .waitForElementVisible('.ant-menu-submenu-title a', 3000)
      .verify.containsText('.ant-menu-submenu-title a', username)
      .end();
  },
};
