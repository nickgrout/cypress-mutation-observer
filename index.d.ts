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

  interface Actions {
    (action: 'mutationObserver:before:create', fn: (mutationObserver: MutationObserver) => void): Cypress
    (action: 'mutationObserver:after:create', fn: (mutationObserver: MutationObserver) => void): Cypress
    (action: 'mutationObserver:before:unload', fn: (mutationObserver: MutationObserver) => void): Cypress
    (action: 'mutationObserver:mutate', fn: (mutationRecords: MutationRecord[], mutationObserver: MutationObserver) => void): Cypress
  }
}
