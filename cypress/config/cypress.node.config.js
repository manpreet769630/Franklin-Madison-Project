const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://franklinmadisonode1.prod.acquia-sites.com/',
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
});
