const chromeDriver = require('chromedriver').path;


// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['tests/e2e/tests/'],
  output_folder: 'tests/e2e/reports',

  webdriver: {
    start_process: true,
    server_path: chromeDriver,
    port: 9515,
    cli_args: {
      'webdriver.chrome.driver': chromeDriver,
    },
  },

  test_settings: {
    default: {
      silent: true,
      globals: {
        devServerURL: 'http://localhost:3000',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--no-sandbox'],
        },
      },
    },
  },
};
