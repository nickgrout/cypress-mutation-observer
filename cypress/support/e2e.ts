require("../../src/waitForDOMInactivity");
require("../../src/mutationObserverEvent");

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Get the current process time in MS
       */
      getCurrentTimeMs(): Cypress.Chainable<number>;

      /**
       * Visit a url with user agent set such that the browser is detected as a robot
       * and the session is not redirected/frame busted.
       *
       * Accepts optional headers, which default to robot user-agent & MIME type
       */
      visitWithAutomationHeaders(
        url: string,
        headers?: {[key: string]: string},
      ): Chainable<AUTWindow>;
    }
  }
}

Cypress.Commands.add("visitWithAutomationHeaders", (url: string, headers?: {[key: string]: string}) => {
  const defaultHeaders = {
    accept: "application/json, text/plain, */*",
    "user-agent": "axios/0.27.2",
  };
  return cy.visit(url, {
    headers: {
      ...defaultHeaders,
      ...(headers || {}),
    },
  });
});

Cypress.Commands.add("getCurrentTimeMs", () => {
  const dateNow = Date.now();
  Cypress.log({
    displayName: "getCurrentTimeMs",
    message: `${dateNow}ms`,
  });
  return cy.wrap(dateNow);
});

export default {};
