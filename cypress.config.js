const { defineConfig } = require('cypress')
const fs = require('fs')
const neatCSV = require('neat-csv')
// https://github.com/bahmutov/cypress-split
const cypressSplit = require('cypress-split')
const { verifyDownloadTasks } = require('cy-verify-downloads')



module.exports = defineConfig({

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
    saveAllAttempts: false,
	},
	e2e: {
	},
	
	  async setupNodeEvents(on, config) {
		require('cypress-mochawesome-reporter/plugin')(on);
		on('task', verifyDownloadTasks);
  
		const inputFileName = config.env.inputTestFile;
  
		console.log('Loading file:', inputFileName);
  
		const text = fs.readFileSync(inputFileName, 'utf8');
		const csv = await neatCSV(text);
  
		console.log('Loaded URLs:');
		console.log(csv);
		require('@cypress/grep/src/plugin')(config);

  
		const version = config.env.version || 'stage';
		config.env = require(`./cypress/config/cypress.${version}.config.js`);
  
		config.baseUrl = config.env.baseUrl;
		config.env.urlsList = csv;
  
		cypressSplit(on, config);
  
		return config;
	  
	  }
	})
  