
const urls = Cypress.env("urlsList");
import scrollToBottom from 'scroll-to-bottomjs';
// const now = new Date();
describe("Visual regression testing in Franklin Madison", { tags: "@percy" }, () => {
  beforeEach(() => {
		cy.viewport(1280, 1320)
		
	})

  urls.slice(0, 6).forEach((page) => {
    it(`Visual comparison of the page: ${page["url"]} page`, () => {
      // cy.request(page["url"]).then((response) => {
      //   // Assert that the status code is 200
      //   expect(response.status).to.not.be.oneOf([
      //     400, // Bad Request
      //     401, // Unauthorized
      //     403, // Forbidden
      //     404, // Not Found
      //     408, // Request Timeout
      //     500, // Internal Server Error
      //     502, // Bad Gateway
      //     503, // Service Unavailable
      //     504, // Gateway Timeout
      //     505, // HTTP Version Not Supported
      //   ]);
      //   cy.document().should("have.property", "visibilityState", "visible");
      // })
      //Mark our window object to "know" when it gets reloaded
      cy.window().then((w) => (w.beforeReload = true));

      //Initially the new property is there
      cy.window().should("have.prop", "beforeReload", true);
        // Check if the "Skip" button is present
       //Visiting the page and added based on this reference: https://github.com/cypress-io/cypress/issues/19725#issuecomment-1014250390
       cy.visit(page["url"]);
    
      
      //After reload the property should be gone
      cy.window().should("not.have.prop", "beforeReload");

      // //Scroll down as the page is having lazy loading component in it
      // cy.window().then((cyWindow) =>
      //   scrollToBottom({ remoteWindow: cyWindow })
      // );
       //Scroll down as the page is having lazy loading component in it
       cy.scrollTo("bottom", { ensureScrollable: false }).wait(1000);
       cy.scrollTo("top", { ensureScrollable: false }).wait(1000);

      //Enable visual regression
      cy.percySnapshot(`${page.url} page`);
    
    
  })
  })
})
