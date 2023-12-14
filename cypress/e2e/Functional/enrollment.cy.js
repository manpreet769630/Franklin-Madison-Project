Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const sourceFile = require('../../fixtures/e2e_source.prod.json');

describe("Check the 'Enrollment' form submission for Dev/node environment", { tags: '@dev' }, () => {
  const testUrls = [
    '/insurance/telcoe-federal-credit-union/mnl/add/531003517',
    '/insurance/truist/mnl/hap',
    '/insurance/unify/chubb/add/528198487',
    '/insurance/zions-bank/mnl/add/531800216',
    '/insurance/broadview-federal-credit-union/securian/add',
    '/insurance/vantage-credit-union/sirius/add',
    '/insurance/members-choice-credit-union/chubb/hap/531003268',
    '/insurance/waterbury-ct-teachers-fcu/chubb/hap/532540835',
    '/insurance/tinker-federal-credit-union/mnl/add/532173021',
    
  ];

  testUrls.forEach((testUrl, index) => {
    const page = sourceFile[index];

    it(
      `Verify 'Enrollment' form submission for the page: ${testUrl} in Dev Environment`,
      { tags: '@node_enrollment_member_info' },
      () => {
        cy.visit(testUrl);
        cy.stageEnrollmentFormSubmissionViaUI(
          testUrl,
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
      }
    );
  });
});

describe(
  "Check the 'Enrollment' form submission for Stage Environment", { tags: '@stage' }, () => {
  const testUrls = [
    '/insurance/eecu/mnl/add',
    '/insurance/truist/mnl/hap/524727013',
    '/insurance/abc-credit-union-chubb/chubb/add',
    '/insurance/woodforest-national-bank/mnl/add',
    '/insurance/sefcu/securian/add',
    '/insurance/vantage-credit-union/sirius/add',
    '/insurance/eecu/chubb/hap',
    '/insurance/renasant-bank/chubb/hap',
    '/insurance/eecu/mnl/add',
  ];

  testUrls.forEach((testUrl, index) => {
    const page = sourceFile[index];

    it(
      `Verify 'Enrollment' form submission for the page: ${testUrl} in Stage Environment`,
      { tags: '@stage_enrollment_member_info' },
      () => {
        cy.visit(testUrl);
        cy.stageEnrollmentFormSubmissionViaUI(
          testUrl,
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
      }
    );
  });
});

describe(
  "Check the 'Enrollment' form submission for Production Environment", { tags: '@prod' }, () => {
  const testUrls = [
    '/insurance/gesa-credit-union/mnl/add',
    // '/insurance/truist/mnl/hap/524727013',
    // '/insurance/abc-credit-union-chubb/chubb/add',
    // '/insurance/eecu/mnl/add',
    // '/insurance/sefcu/securian/add',
    // '/insurance/vantage-credit-union/sirius/add',
    // '/insurance/renasant-bank/chubb/hap',
    // '/insurance/suncoast-credit-union/chubb/hap',
    // '/insurance/abc-credit-union/mnl/add-0',
    
  ];

  testUrls.forEach((testUrl, index) => {
    const page = sourceFile[index];

    it(
      `Verify 'Enrollment' form submission for the page: ${testUrl} in prod Environment`,
      { tags: '@prod_enrollment_member_info' },
      () => {
        cy.visit(testUrl);
        cy.prodEnrollmentFormSubmissionViaUI(
          // page.title,
          testUrl,
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
      }
    );
  });
});
