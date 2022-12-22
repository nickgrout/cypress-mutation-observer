import { ASYNC_SITE } from "../support/constants";

function getTimeSinceLastDOMMutation(): Cypress.Chainable<number> {
  return cy
    .window()
    .then((win) => win.document.mutationObserverContainer.lastMutation);
}

describe("verify mutationObserverEvents", () => {
  it("attaches a mutation observer to the current document", () => {
    cy.on("mutationObserver:mutate", (mutationRecords) => {
      console.log(`mutationRecords: ${mutationRecords[0].type}`);
    });
    cy.visitWithAutomationHeaders(ASYNC_SITE)
      .window()
      .then((win) => win.document.mutationObserverContainer)
      .should("not.be.undefined")
      .then((container) => container.mutationObserver)
      .should("not.be.undefined")
      .window()
      .then((win) => win.document.mutationObserverContainer.lastMutation)
      .should("be.at.least", 0)
      .waitForDOMInactivity();
  });
  it("emits the mutate event when the document is mutated", (done) => {
    cy.visitWithAutomationHeaders(ASYNC_SITE)
      .then(() => {
        cy.once("mutationObserver:mutate", (mutationRecords) => {
          expect(mutationRecords[0].type).to.not.be.undefined;
          done();
        });
      })
      .waitForDOMInactivity();
  });
  it("mutation observer updates lastMutation with document changes", () => {
    cy.visitWithAutomationHeaders(ASYNC_SITE).waitForDOMInactivity();
    getTimeSinceLastDOMMutation()
      .as("firstTimeSinceMutate")
      .waitForDOMInactivity();
    getTimeSinceLastDOMMutation().then((afterTimeSinceMutate) => {
      cy.get("@firstTimeSinceMutate").should(
        "be.lessThan",
        afterTimeSinceMutate
      );
    });
  });
});
