const { defineConfig } = require('cypress');

module.exports = defineConfig({
  baseUrl: 'https://franklinmadison.prod.acquia-sites.com',
  e2e: {
    
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
});
