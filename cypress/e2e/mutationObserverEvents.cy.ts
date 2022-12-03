import {ASYNC_SITE} from  '../support/constants'

describe("verify mutationObserverEvents", () => {
  it("attaches a mutation observer to the current document", () => {
    cy.on('mutationObserver:mutate', (mutationRecords) => {
        console.log(`mutationRecords: ${mutationRecords[0].type}`);
    })
    cy.visit(ASYNC_SITE, {
      headers: {
        accept: "application/json, text/plain, */*",
        "user-agent": "axios/0.27.2",
      },
    })
    .window()
    .then((win) => win.document.mutationObserverContainer)
    .should('not.be.undefined')
    .then(container => container.mutationObserver)
    .should('not.be.undefined')
    .window()
    .then((win) => win.document.mutationObserverContainer.lastMutation)
    .should('be.at.least', 0);
  });
});
