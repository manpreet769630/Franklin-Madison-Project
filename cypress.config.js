const { defineConfig } = require('cypress')
const fs = require('fs')
const neatCSV = require('neat-csv')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')
const { verifyDownloadTasks } = require('cy-verify-downloads')
// const logOptions={
// 	printLogToConsole: 'always'

// }


module.exports = defineConfig({
	viewportHeight: 900,
	viewportWidth: 900,
	reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
	e2e: {
	viewportHeight: 900,
	viewportWidth: 900,
	watchForFileChanges: false,
	projectId: "y5i9gj",
	eyesTimeout: 180000,
	video: false,
	defaultCommandTimeout: 120000,
	pageLoadTimeout: 120000,
	experimentalStudio: false,
	requestTimeout: 15000,
	responseTimeout: 120000,
	trashAssetsBeforeRuns: false,
	chromeWebSecurity: false,
	
	
	async setupNodeEvents(on, config) {
		require('cypress-mochawesome-reporter/plugin')(on)
		// implement node event listeners here
		// require('cypress-mochawesome-reporter/plugin')(on)
		on('task', verifyDownloadTasks);


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

	// Get the Cypress environment version or default to 'stage'
	const version = config.env.version || 'stage'

	// Load environment variables from a JSON file
	config.env = require(`./cypress/config/${version}.json`)

	// Change the baseUrl to the one specified in the environment
	config.baseUrl = config.env.baseUrl
	config.env.urlsList = csv
// Return the updated config object
return config;

			
		},
			}
			})
			
		