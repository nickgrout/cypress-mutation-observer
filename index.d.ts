interface WaitForDOMInactivityOptions {
  minInactivityTimeMs: number;
  maxInactivityTimeMs: number;
  intervalMs: number;
}

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface Chainable<Subject = any> {
    /**
     * Waits until the DOM has not been changed. Useful for handling pages
     * that use deferred hydration as in PageSlot.
     */
    waitForDOMInactivity(
      options?: WaitForDOMInactivityOptions
    ): Cypress.Chainable;
  }
}
