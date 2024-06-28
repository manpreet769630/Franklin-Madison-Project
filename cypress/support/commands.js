// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import '@percy/cypress'
import 'cypress-audit/commands'
import scrollToBottom from 'scroll-to-bottomjs'

const generator = require('creditcard-generator')
// const severityIndicators = {
//   minor: '⚪️',
//   moderate: '🟡',
//   serious: '🟠',
//   critical: '🔴',
// };
// function reportA11y(violations) {
//   const violationData = violations.map(
//     ({ id, impact, description, nodes }) => ({
//       id,
//       impact,
//       description,
//       nodes: nodes.length,
//     }),
//   );
//   //To print accessibility issues in console.log in table format which helps for reporting
//   cy.task('table', violationData);

//   //Log A11Y issues in cypress test runner(interactive mode) which helps for faster fix
//   //This is referred from https://github.com/jonoliver/cypress-axe-demo
//   violations.forEach((violation) => {
//     const nodes = Cypress.$(
//       violation.nodes.map((node) => node.target).join(','),
//     );
//     Cypress.log({
//       name: `${severityIndicators[violation.impact]} A11Y`,
//       consoleProps: () => violation,
//       $el: nodes,
//       message: `[${violation.help}](${violation.helpUrl})`,
//     });

//     violation.nodes.forEach(({ target }) => {
//       Cypress.log({
//         name: '🔧',
//         consoleProps: () => violation,
//         $el: Cypress.$(target.join(',')),
//         message: target,
//       });
//     });
//   });
// }

// /**
//  * Include and Check Accessibility A11y issues for the given pages and impacts
//  * @param {*} path - string
//  * @param {*} impacts - object
//  */
// Cypress.Commands.add('checkPageA11y', (path, impacts) => {
//   cy.visit(path);
//   cy.injectAxe();
//   //Filtering to include and report only the given impacts violations else consider and report all impacts(minor,moderate,serious,critical)
//   if (impacts) {
//     cy.checkA11y(null, impacts, reportA11y);
//   } else {
//     cy.checkA11y(null, null, reportA11y);
//   }
// });

/**
 * Submit Sample Enrollment Form Submission via UI
 * @param {*} title - string
 * @param {*} url - string
 * @param {*} enroll_state - string
 * @param {*} enroll_accesscode - string
 * @param {*} enroll_lname - string
 * @param {*} enroll_fname - string
 * @param {*} enroll_mi - string
 * @param {*} enroll_address1 - string
 * @param {*} enroll_address2 - string
 * @param {*} enroll_city - string
 * @param {*} enroll_zip - string
 * @param {*} cov_email - string
 */
Cypress.Commands.add(
	'stageEnrollmentFormSubmissionViaUI',
	(
		url,
		enroll_state,
		enroll_accesscode,
		enroll_lname,
		enroll_fname,
		enroll_mi,
		enroll_address1,
		enroll_address2,
		enroll_city,
		enroll_zip,
		cov_email
	) => {
		//Visiting the page
		cy.visit(url)
		cy.title().then(title => {
			cy.log(`Title for ${url}: ${title}`)
		})

		//Check the page is loaded with required url
		cy.location().should(location => {
			expect(location.href).to.include(url)
		})
		//Scroll down as the page is having lazy loading component in it
		cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }))

		cy.title().then(title => {
			console.log(title)
		})
		//Issue with Percy#: 466545 - handling issue with existing animation and transition CSS rule in legacy code
		// cy.wait(3000)
		// cy.percySnapshot(`${title}-landing page`);
		// cy.intercept('https://bam.nr-data.net/events/1/**').as('enrollmentPage');
		cy.intercept('**/enrollment').as('enrollmentPage')
		cy.intercept('**=drupal_ajax').as('loadingSpinner')

		//Select State
		cy.get('select')
			.select(enroll_state)
			.invoke('val')
			.should('eq', enroll_state)
			// cy.get('@loadingSpinner', { timeout: 5000 }).should('not.exist');
		cy.wait(5000)
		// cy.get('#edit-submit').click();
		// cy.focused().type('{tab}');
		// cy.focused().click();
		// cy.focused().tab();
		//Click "Get Started" Button
		cy.get('input[data-drupal-selector="edit-submit"]').click()
		// cy.wait(10000)
		// From LNo:123 to 151 about Member/Customer Information form submission
		// cy.contains('information', { timeout: 15000 })
		//   .scrollIntoView()
		//   .should('be.visible');

		cy.wait('@enrollmentPage')
		// cy.percySnapshot(`${title}-Information page`);
		cy.get('body').then($body => {
			if ($body.text().includes('ACCESS CODE ')) {
				cy.get('#edit-invitation-code', { timeout: 4000 }).type(enroll_accesscode).tab()
				// cy.wait(4000)
				cy.get('label[for*=last] + input').clear()
				cy.get('label[for*=last] + input', { timeout: 7000 }).type(enroll_lname).tab()
				// cy.wait(7000)
				cy.get('label[for*=first] + input').clear()
				cy.get('label[for*=first] + input').type(enroll_fname)
				cy.get('label[for*=mi] + input').clear()
				cy.get('label[for*=mi] + input').type(enroll_mi)
			} else if ($body.text().includes('Enter Invitation Code*')) {
				cy.get('label[for*=last] + input').clear()
				cy.get('label[for*=last] + input').type(enroll_lname)
				cy.get('label[for*=first] + input').clear()
				cy.get('label[for*=first] + input').type(enroll_fname)
				cy.get('label[for*=mi] + input').clear()
				cy.get('label[for*=mi] + input').type(enroll_mi)
			} else {
				cy.get('label[for*=first] + input').clear()
				cy.get('label[for*=first] + input').type(enroll_fname)
				cy.get('label[for*=mi] + input').clear()
				cy.get('label[for*=mi] + input').type(enroll_mi)
				cy.get('#edit-last-name').clear({ force: true })
				cy.get('#edit-last-name').type(enroll_lname)
			}
		})

		cy.get('[name$="1"]').clear()
		cy.get('[name$="1"]').type(enroll_address1)
		cy.get('[name$="2"]').clear()
		cy.get('[name$="2"]').type(enroll_address2)
		cy.get('label[for*=city] + input').clear()
		cy.get('label[for*=city] + input').type(enroll_city)
		cy.get('label[for*=zip] + input').clear()
		cy.get('label[for*=zip] + input').type(enroll_zip)
		cy.get('[name*="onfirm"][type="checkbox"]').check().should('be.checked')
		cy.get('[class*="continue"]').click()
		// From LNo:152 to 175 about Coverage Information form submission
		cy.contains('Coverage', { timeout: 15000 }).should('be.visible')
		//Issue with Percy#: 466545 - handling issue with existing animation and transition CSS rule in legacy code
		cy.url().should('include', '/enrollment'); // Replace '/enrollment' with the current page's path
		// cy.percySnapshot(`${title}-Coverage page`);
		cy.get('body').then($body => {
			if ($body.text().includes('Select one:')) {
				cy.get('input[value="Level_1"]+label')
					.scrollIntoView()
					.should($element => {
						const text = $element.text()
						expect(text).to.include('25,000.00') ||
							expect(text).to.include('50,000.00') ||
							expect(text).to.include('75,000.00')
					})

				cy.get('input[value="Level_1"]')
					.scrollIntoView()
					.check()
					.should('be.checked')
				cy.get('label[for*=bene] + input').first().type(enroll_fname)
			}
		})
		cy.get('body').then($body => {
			if ($body.text().includes('I select the following')) {
				cy.get('[value="Individual"]').check().should('be.checked')
			}
		})
		cy.get('select[class*="form"]')
  .first()
  .then($select => {
    const dynamicOptionText = $select.text().includes('Credit Union share draft account')
      ? $select.text().match(/Credit Union share draft account/)[0]
      : null;

    if (dynamicOptionText) {
      cy.wrap($select).select(dynamicOptionText);
    } else {
      cy.wrap($select).select('Credit or Debit Card I provide');
    }

    // Verify the selected value
    cy.wrap($select).invoke('val').should('eq', dynamicOptionText || 'CCRD');
  
  
	  
		  // Continue with the rest of your code...
		  cy.get('label[for*=number] + input').type(generator.GenCC('VISA', 1).toString());
		  cy.get('label[for*=month] +select').select('12').invoke('val').should('eq', '12');
		  cy.get('label[for*=year] +select').select([1]).invoke('val').should('eq', new Date().getFullYear().toString());
		
		});
	


		// cy.get('select[class*="form"]')
		// 	.first()
		// 	.select('Credit or Debit Card I provide')
		// 	.invoke('val')
		// 	.should('eq', 'CCRD')
		// cy.get('label[for*=number] + input').type(
		// 	generator.GenCC('VISA', 1).toString()
		// )
		// //Select Last month
		// cy.get('label[for*=month] +select')
		// 	.select('12')
		// 	.invoke('val')
		// 	.should('eq', '12')
		// //Select Current year
		// cy.get('label[for*=year] +select')
		// 	.select([1])
		// 	.invoke('val')
		// 	.should('eq', new Date().getFullYear().toString())
		cy.get('input[name*=il]').first().type(cov_email)
		cy.get('input[size="40"]').last().type(cov_email)

		cy.get('body').then($body => {
			if (
				$body
					.text()
					.includes(
						'I Accept the Disclosures above.' &&
							'I Accept the Authorization and Terms above.'
					)
			) {
				cy.get('input[id$=edit-disclosure-accept-terms]').click()
				cy.get('input[id$=edit-accept-terms]').click()
			} else {
				cy.get('input[id*=edit-accept-agreement]').click()
				cy.get('input[id*=edit-accept-terms]').click()
			}

		cy.intercept('**/thankyou').as('thankYouPage')
		cy.get('input[type$="submit"]').click()
		// Check Welcome Message
		cy.contains(enroll_fname, { timeout: 15000 }).should('be.visible')
		//Scroll down as the page is having lazy loading component in it
		cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }))
		//Issue with Percy#: 466545 - handling issue with existing animation and transition CSS rule in legacy code
		// cy.wait(5000);
		// cy.percySnapshot(`${title}-Welcome page`);
		// cy.wait(5000)
		cy.get('body').then($body => {
			if (
				$body.text().includes('Welcome!') &&
				!$body.text().includes('Recuperative Care Plan')
			) {
				cy.get('[class*="plan-details"] > :nth-child(8) > span')
					.invoke('text', '1976-01-01')
					.trigger('change', { force: true })
				cy.get('[class*="plan-details"] > :nth-child(7) > span')
					.invoke('text', '123456789')
					.trigger('change', { force: true })
			} else if (
				$body.text().includes('Welcome!') &&
				$body.text().includes('Recuperative Care Plan')
			) {
				cy.get('[class*="plan-details"] > :nth-child(7) > span')
					.invoke('text', '1976-01-01')
					.trigger('change', { force: true })
				cy.get('[class*="plan-details"] > :nth-child(6) > span')
					.invoke('text', '123456789')
					.trigger('change', { force: true })
			} else {
				cy.get(':nth-child(4) > :nth-child(1) > span')
					.invoke('text', '1976-01-01')
					.trigger('change', { force: true })
				cy.get(':nth-child(2) > :nth-child(1) > span')
					.invoke('text', '123456789')
					.trigger('change', { force: true })
			}
		})
	
	
	})
})

/**
 * Submit Sample Enrollment Form Submission via UI
 * @param {*} title - string
 * @param {*} url - string
 * @param {*} enroll_state - string
 * @param {*} enroll_accesscode - string
 * @param {*} enroll_lname - string
 * @param {*} enroll_fname - string
 * @param {*} enroll_mi - string
 * @param {*} enroll_address1 - string
 * @param {*} enroll_address2 - string
 * @param {*} enroll_city - string
 * @param {*} enroll_zip - string
 * @param {*} cov_email - string
 */
Cypress.Commands.add(
	'prodEnrollmentFormSubmissionViaUI',
	(
		url,
		enroll_state,
		enroll_accesscode,
		enroll_lname,
		enroll_fname,
		enroll_mi,
		enroll_address1,
		enroll_address2,
		enroll_city,
		enroll_zip,
		cov_email
	) => {
		//Visiting the page
		cy.visit(url)
		//Check the page is loaded with required url
		cy.location().should(location => {
			expect(location.href).to.include(url)
		})
		//Scroll down as the page is having lazy loading component in it
		cy.window().then(cyWindow => scrollToBottom({ remoteWindow: cyWindow }))
		//Issue with Percy#: 466545 - handling issue with existing animation and transition CSS rule in legacy code
		// cy.wait(3000)
		// cy.percySnapshot(`${title}-landing page`);
		// cy.intercept('https://bam.nr-data.net/events/1/**').as('enrollmentPage');
		cy.intercept('**/enrollment').as('enrollmentPage')
		cy.intercept('**=drupal_ajax').as('loadingSpinner')

		//Select State
		cy.get('select')
			.select(enroll_state)
			.invoke('val')
			.should('eq', enroll_state)
		cy.wait(5000)
		// cy.get('#edit-submit').click();
		// cy.focused().type('{tab}');
		// cy.focused().click();
		// cy.focused().tab();
		//Click "Get Started" Button
		cy.get('#edit-submit').click()
		// cy.wait(10000)
		// From LNo:123 to 151 about Member/Customer Information form submission
		// cy.contains('information', { timeout: 15000 })
		//   .scrollIntoView()
		//   .should('be.visible');

		cy.wait('@enrollmentPage')
		// cy.percySnapshot(`${title}-Information page`);
		cy.get('body').then($body => {
			if ($body.text().includes('Access Code*')) {
				cy.get('#AccessCode').type(enroll_accesscode).tab()
				cy.get('label[for*=last] + input').clear()
				cy.get('label[for*=last] + input').type(enroll_lname).tab()
				cy.get('label[for*=first] + input').clear()
				cy.get('label[for*=first] + input').type(enroll_fname)
			} else {
				cy.get('label[for*=last] + input').clear()
				cy.get('label[for*=last] + input').type(enroll_lname)
				cy.get('label[for*=first] + input').clear()
				cy.get('label[for*=first] + input').type(enroll_fname)
			}
		})
		cy.get('label[for*=mi] + input').clear()
		cy.get('label[for*=mi] + input').type(enroll_mi)
		cy.get('[name$="1"]').clear()
		cy.get('[name$="1"]').type(enroll_address1)
		cy.get('[name$="2"]').clear()
		cy.get('[name$="2"]').type(enroll_address2)
		cy.get('label[for*=city] + input').clear()
		cy.get('label[for*=city] + input').type(enroll_city)
		cy.get('label[for*=zip] + input').clear()
		cy.get('label[for*=zip] + input').type(enroll_zip)
		cy.get('[name*="onfirm"][type="checkbox"]').check().should('be.checked')
		cy.get('[class*="continue"]').click()
		// From LNo:152 to 175 about Coverage Information form submission
		cy.contains('Coverage', { timeout: 15000 }).should('be.visible')
		//Issue with Percy#: 466545 - handling issue with existing animation and transition CSS rule in legacy code
		// cy.wait(5000)
		// cy.percySnapshot(`${title}-Coverage page`);
		cy.get('body').then($body => {
			if ($body.text().includes('Select one:')) {
				cy.get('input[value="Level_1"]+label')
					.scrollIntoView()
					.should($element => {
						const text = $element.text()
						expect(text).to.include('25,000.00') ||
							expect(text).to.include('50,000.00') ||
							expect(text).to.include('75,000.00')
					})

				cy.get('input[value="Level_1"]')
					.scrollIntoView()
					.check()
					.should('be.checked')
				cy.get('label[for*=bene] + input').first().type(enroll_fname)
			}
		})
		cy.get('body').then($body => {
			if ($body.text().includes('I select the following')) {
				cy.get('[value="Individual"]').check().should('be.checked')
			}
		})
		cy.get('select[class*="form"]')
			.first()
			.select('Credit or Debit Card I provide')
			.invoke('val')
			.should('eq', 'CCRD')
		cy.get('label[for*=number] + input').type(
			generator.GenCC('VISA', 1).toString()
		)
		//Select Last month
		cy.get('label[for*=month] +select')
			.select('12')
			.invoke('val')
			.should('eq', '12')
		//Select Current year
		cy.get('label[for*=year] +select')
			.select([1])
			.invoke('val')
			.should('eq', new Date().getFullYear().toString())
		cy.get('input[name*=il]').first().type(cov_email)
		cy.get('input[size="40"]').last().type(cov_email)

		// cy.get('body').then(($body) => {
		//   if (
		//     $body
		//       .text()
		//       .includes(
		//         'I Accept the Disclosures above.' &&
		//           'I Accept the Authorization and Terms above.',
		//       )
		//   ) {
		//     cy.get('input[id$=edit-disclosure-accept-terms]').click();
		//     cy.get('input[id$=edit-accept-terms]').click();
		//   } else {
		//     cy.get('input[id*=edit-accept-agreement]').click();
		//     cy.get('input[id*=edit-accept-terms]').click();
		//   }
		// });
	}
)



/**
 * Check all the images in the page are not broken through request
 */
Cypress.Commands.add('verifyBrokenImagesViaAPI', () => {
	cy.get('img').then($img => {
		let sourceUrls = $img.map((imgIndex, element) => {
			return Cypress.$(element).prop('src')
		})
		for (var srcIndex = 0; srcIndex < sourceUrls.length; srcIndex++) {
			cy.request(sourceUrls[srcIndex]).then(response => {
				expect(response.status).to.be.eq(200)
			})
		}
	})
})

/**
 * Check all the images in the page are not broken using naturalWidth/Height
 * naturalWidth" and "naturalHeight" are set when the image loads
 */
Cypress.Commands.add('verifyBrokenImagesViaHeight', () => {
	cy.get('img')
		.should('be.visible')
		.and($img => {
			let images = $img.map((imgIndex, element) => {
				return Cypress.$(element).get()
			})
			for (var imgIndex = 0; imgIndex < images.length; imgIndex++) {
				expect(images[imgIndex].getAttribute('src')).to.include('/')
				expect(images[imgIndex].naturalHeight).to.be.greaterThan(0)
			}
		})
})

/**
 * Verify the element's href
 * @param {*} locator - string (CSS locator)
 * @param {*} textContent - string
 * @param {*} urlLink - string
 */
Cypress.Commands.add('verifyLinkage', (locator, textContent, urlLink) => {
	cy.get(locator)
		.contains(textContent)
		.should('have.attr', 'href')
		.and('contain', urlLink)
	cy.request(urlLink).then(response => {
		expect(response.status).to.be.eq(200)
	})
})

/**
 * Verify all the links in the page are not broken using API approach
 */
Cypress.Commands.add('linkChecker', () => {
	cy.get('a').then($a => {
		let sourceUrls = $a.map((i, el) => {
			return Cypress.$(el).prop('href')
		})
		for (var i = 0; i < sourceUrls.length; i++) {
			if (
				sourceUrls[i] != '' &&
				!sourceUrls[i].includes('linkedin') &&
				!sourceUrls[i].includes('mailto')
			) {
				cy.request(sourceUrls[i]).then(response => {
					expect(response.status).to.be.eq(200)
				})
			}
		}
	})
})

/**
 * Verify all the response of all the links under the given element
 * @param {*} locator - string (CSS locator)
 * @param {*} textContent - string
 */
Cypress.Commands.add('verifyLinksInThisSection', (locator, textContent) => {
	cy.get(locator).then($links => {
		let sourceUrls = $links.map((i, el) => {
			return Cypress.$(el).prop('href')
		})
		for (var i = 0; i < sourceUrls.length; i++) {
			if (sourceUrls[i] != '') {
				cy.request(sourceUrls[i]).then(response => {
					expect(response.status).to.be.eq(200)
					expect(response.body).contains(textContent)
				})
			}
		}
	})
})

/**
 * Verify the element is NOT in view port
 * @param {*} locator - string (CSS locator)
 */
Cypress.Commands.add('isNotInViewport', locator => {
	cy.get(locator).should($el => {
		const viewPort = Cypress.$(cy.state('window')).height()
		const rect = $el[0].getBoundingClientRect()
		expect(rect.top).to.be.greaterThan(viewPort)
		expect(rect.bottom).to.be.greaterThan(viewPort)
	})
})

/**
 * Verify the element is IN view port
 * @param {*} locator - string (CSS locator)
 */
Cypress.Commands.add('isInViewport', locator => {
	cy.get(locator).should($el => {
		const viewPort = Cypress.$(cy.state('window')).height()
		const rect = $el[0].getBoundingClientRect()
		expect(rect.top).not.to.be.greaterThan(viewPort)
		expect(rect.bottom).not.to.be.greaterThan(viewPort)
	})
})

Cypress.Commands.add('deletionContenttype', () => {
	cy.get('.toolbar-icon-system-admin-content').click()
	cy.get('table tbody td:nth-child(2)').each(($el, index, $list) => {
		if ($el.text().includes('Test Functional Automation')) {
			cy.get('table tbody td:nth-child(2)')
				.eq(index)
				.prev()
				.find('[type="checkbox"]')
				.check({ force: true })
		}
	})
	cy.get('select#edit-action').select('Delete content', { force: true })
	cy.get('#edit-submit').click({ force: true })
	cy.get('#edit-submit').click()

	cy.get('.messages--status').should('contain', 'Deleted')
})

	