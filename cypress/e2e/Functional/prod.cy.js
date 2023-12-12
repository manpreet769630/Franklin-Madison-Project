Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

const sourceFile = require('../../fixtures/e2e_source.prod.json');

describe("Check the 'Enrollment' form submission", { tags: '@e2e' }, () => {
  sourceFile.forEach((page) => {
    it(
      `Verify 'Enrollment' form submission for the page: ${page.url} in Prod Environment`,
      { tags: '@prod_enrollment_member_info' },
      () => {
        cy.visit(page.url);
        cy.prodEnrollmentFormSubmissionViaUI(
          // page.title,
          page.url,
          page.enroll_state,
          page.enroll_accesscode,
          page.enroll_lname,
          page.enroll_fname,
          page.enroll_mi,
          page.enroll_address1,
          page.enroll_address2,
          page.enroll_city,
          page.enroll_zip,
          page.cov_email,
        );
      },
    );
  });
});
