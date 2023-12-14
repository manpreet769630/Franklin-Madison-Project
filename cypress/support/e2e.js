// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@percy/cypress'
require('cypress-plugin-tab')
import 'cypress-mochawesome-reporter/register';


const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()


// import { register } from 'cypress-mochawesome-reporter'

// module.exports = (on, config) => {
// 	register(on)
// }

/*eslint no-undef: "error"*/
/*eslint-env node*/

// load and register the grep feature
// https://github.com/bahmutov/cypress-grep

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Reference: https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__errors
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from failing the test
	return false
})

// Hide XHR Request
const app = window.top
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
	const style = app.document.createElement('style')
	style.innerHTML = '.command-name-request, .command-name-xhr { display: none }'
	style.setAttribute('data-hide-command-log-request', '')
	app.document.head.appendChild(style)
}

// Cypress.on('test:after:run', (test, runnable) => {
//   if (test.state === 'failed') {
//     let item = runnable;
//     const nameParts = [runnable.title];

//     while (item.parent) {
//       nameParts.unshift(item.parent.title);
//       item = item.parent;
//     }

//     if (runnable.hookName) {
//       nameParts.push(`${runnable.hookName} hook`);
//     }

//     const fullTestName = nameParts.filter(Boolean).join(' -- ');
//     const screenshotPath = `${fullTestName} (failed).png`.replace('  ', ' ');

//     addContext({ test }, screenshotPath);
//   }
// });
// cypress/support/index.js
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
