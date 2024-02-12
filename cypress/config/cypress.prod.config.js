const { defineConfig } = require('cypress')

module.exports = defineConfig({
	
	e2e: {
		baseUrl: 'https://franklinmadison.prod.acquia-sites.com/',
	},
	setupNodeEvents(on, config) {
		// implement node event listeners here
	},
})
