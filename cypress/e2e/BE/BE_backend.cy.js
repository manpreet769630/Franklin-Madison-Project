/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const { authenticator } = require("otplib");

describe("Testing of Backend scenarios for Franklin Madison",  () => {
  beforeEach(() => {
		cy.viewport(1440, 900)

		// cy.byPassCloudflare()
		
	})
it("Creation of Microsite", () => {

  const secretKey = "GWJ4ES4XLWJEIM6S";
  const code = authenticator.generate(secretKey);
  cy.log("6-digit TOTP code:", code);
  cy.visit("/user/login");
  cy.get("#edit-name").type("manpreet");
  cy.get("#edit-pass").type("admin123");
  cy.get("#edit-submit").click();
  cy.get("#edit-code").type(code);
  cy.get("#edit-login").click();
  cy.visit("https://franklinmadisonstg.prod.acquia-sites.com/admin/content", {
    failOnStatusCode: false,
  });
  cy.visit('/node/add/microsite')
  cy.get('#edit-title-0-value').type('Test Functional Automation')
  cy.get('#edit-field-client').select('ABC Credit Union').should('have.value', '6')
  cy.get('#edit-field-carrier').select('MNL').should('have.value', '6')
  cy.get('#edit-field-product').select('ADD').should('have.value', '41')
  cy.get('input[data-drupal-selector="edit-field-coverage-amount-0-value"]').type('1000.00')
  cy.get('#edit-field-landing-page').select('MNL ADD Template').should('have.value', '1731')
  cy.get('#edit-field-enrollment-page').select('MNL ADD Template').should('have.value', '1721')
  cy.get('#edit-field-thankyou-page').select('MNL ADD Template').should('have.value', '1736')
  cy.get('#edit-field-header-section').select('MNL ADD Template').should('have.value', '1716')
  cy.get('#edit-field-footer-section').select('MNL ADD Template').should('have.value', '1741')
  cy.get('#edit-field-enrollment-email-template').select('MNL ADD Template').should('have.value', '1726')
  cy.get('#edit-moderation-state-0-state').select('Published').should('have.value', 'published')
  cy.get('#edit-submit').click()
  cy.get('.coh-list-container >li').should('be.visible')
  cy.get('h2[data-ssa-form-type="form-textarea"]').should('be.visible')
  cy.deletionContenttype()
});


it("Cloning of Microsite", () => {

  const secretKey = "GWJ4ES4XLWJEIM6S";
  const code = authenticator.generate(secretKey);
  cy.log("6-digit TOTP code:", code);
  cy.visit("/user/login");
  cy.get("#edit-name").type("manpreet");
  cy.get("#edit-pass").type("admin123");
  cy.get("#edit-submit").click();
  cy.get("#edit-code").type(code);
  cy.get("#edit-login").click();
  cy.visit("https://franklinmadisonstg.prod.acquia-sites.com/admin/content", {
    failOnStatusCode: false,
  });
  cy.get('#edit-type').select('Microsite').should('have.value', 'microsite')
  cy.get('#edit-submit-content').click()
  cy.get('tr:nth-of-type(1) > .views-field.views-field-operations > .dropbutton-multiple >div >ul >li >.dropbutton__toggle').click()
  cy.get('a[href="/clone/8656/quick_clone"]').should('be.visible')
  cy.get('a[href="/clone/8656/quick_clone"]').click()
  cy.get('#edit-title-0-value').clear().type('Test Functional Automation') 
  cy.get('#edit-moderation-state-0-state').select('Published').should('have.value', 'published')
  cy.get('#edit-submit').click()
  cy.get('.coh-list-container >li').should('be.visible')
  cy.get('h2[data-ssa-form-type="form-textarea"]').should('be.visible')
  cy.deletionContenttype()

});
})

