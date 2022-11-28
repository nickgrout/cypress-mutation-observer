require("../../src/waitForDOMInactivity");

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Get the current process time in MS
       */
      getCurrentTimeMs(): Cypress.Chainable<number>;
    }
  }
}

Cypress.Commands.add("getCurrentTimeMs", () => {
  const dateNow = Date.now();
  Cypress.log({
    displayName: "getCurrentTimeMs",
    message: `${dateNow}ms`,
  });
  return cy.wrap(dateNow);
});

export default {};
