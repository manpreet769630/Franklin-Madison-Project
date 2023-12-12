const { defineConfig } = require('cypress')
const fs = require('fs')
const neatCSV = require('neat-csv')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')
const { verifyDownloadTasks } = require('cy-verify-downloads')

module.exports = defineConfig({
	reporter: 'cypress-mochawesome-reporter',
	viewportHeight: 900,
	viewportWidth: 900,
	watchForFileChanges: false,
	projectId: "y5i9gj",
	eyesTimeout: 180000,
	video: false,
	defaultCommandTimeout: 10000,
	pageLoadTimeout: 120000,
	experimentalStudio: false,
	requestTimeout: 15000,
	responseTimeout: 40000,
	trashAssetsBeforeRuns: false,
	chromeWebSecurity: false,
	reporter: 'cypress-mochawesome-reporter',
	reporterOptions: {
		charts: true,
		reportPageTitle: 'custom-title',
		embeddedScreenshots: true,
		inlineAssets: true,
		overwrite: false,
		html: false,
		saveAllAttempts: false,
	},
	e2e: {
		async setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on)

			// require('cypress-mochawesome-reporter/plugin')(on)
			on('task', verifyDownloadTasks)
			// Get the input file name from the environment variable
			const inputFileName = config.env.inputTestFile

			// Log the loading of the file
			console.log('Loading file:', inputFileName)

			// Read the content of the file as text
			const text = fs.readFileSync(inputFileName, 'utf8')

			// Parse the CSV content
			const csv = await neatCSV(text)

			// Log the loaded URLs
			console.log('Loaded URLs:')
			console.log(csv)

			// Set the URLs inside the config object under the environment
			// This makes it available via Cypress.env("urlsList") during tests

			// Load the Cypress Grep plugin
			// require('cypress-grep/src/plugin')(config);
			// require('@cypress/grep/src/plugin')(config)

			// Get the Cypress environment version or default to 'stage'
			const version = config.env.version || 'stage'

			// Load environment variables from a JSON file
			config.env = require(`./cypress/config/cypress.${version}.config.js`)

			// Change the baseUrl to the one specified in the environment
			config.baseUrl = config.env.baseUrl
			config.env.urlsList = csv

			// Return the updated config object
			cypressSplit(on, config)
			return config
		},
	},
})
