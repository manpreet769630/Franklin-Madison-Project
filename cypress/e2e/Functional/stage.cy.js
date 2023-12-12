Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

/* eslint-disable ui-testing/missing-assertion-in-test */
/*eslint-env node*/

const sourceFile = require('../../fixtures/e2e_source.json');

describe("Check the 'Enrollment' form submission", { tags: '@e2e' }, () => {
  sourceFile.forEach((page) => {
    it(
      `Verify 'Enrollment' form submission for the page: ${page.url} in Stage Environment`,
      { tags: '@stage_enrollment_member_info' },
      () => {
        cy.visit(page.url);
        cy.stageEnrollmentFormSubmissionViaUI(
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
