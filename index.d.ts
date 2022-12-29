interface WaitForDOMInactivityOptions {
  minInactivityTimeMs: number;
  maxInactivityTimeMs: number;
  intervalMs: number;
}

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface Chainable {
    /**
     * Waits until the DOM has not been changed. Useful for handling pages
     * that use deferred hydration as in PageSlot.
     */
    waitForDOMInactivity(
      options?: WaitForDOMInactivityOptions
    ): Cypress.Chainable;
  }

  interface ResolvedConfigOptions {
    /**
     * MutationObserver.observe options as defined in w3c standard
     * https://dom.spec.whatwg.org/#dictdef-mutationobserverinit
     */
    cypressMutationObserverConfig: Partial<CypressMutationObserverConfig>;
  }
}

interface CypressMutationObserverConfig {
  enableMutationObserver: boolean;
  mutationCallback: MutationCallback;
  mutationObserverInit: MutationObserverInit;
}

interface MutationObserverContainer {
  mutationObserver: MutationObserver;
  lastMutation: number;
  mutationCallback?: MutationCallback;
}
interface Document {
  mutationObserverContainer?: MutationObserverContainer;
}
