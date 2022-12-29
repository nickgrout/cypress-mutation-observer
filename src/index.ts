import waitForDOMInactivity from "./waitForDOMInactivity";
export { waitForDOMInactivity };

import {
  DEFAULT_MUTATION_OBSERVER_CONFIG,
  MIN_UPDATE_INTERVAL,
} from "./constants";

function mutationObserverCallback(records: MutationRecord[]) {
  // throttle the number of mutation events/sec
  if (
    !this.lastMutation ||
    Date.now() - this.lastMutation > MIN_UPDATE_INTERVAL
  ) {
    this.lastMutation = Date.now();
    this?.mutationCallback?.(records);
  }
}

/**
 * Initialize a new mutation observer on the current window document
 * @param win
 */
export default function initializeMutationObserver(win: Cypress.AUTWindow) {
  if (!Cypress.config().cypressMutationObserverConfig?.enableMutationObserver) {
    return;
  }
  const container: MutationObserverContainer = {
    lastMutation: 0,
    mutationObserver: null,
    mutationCallback:
      Cypress.config().cypressMutationObserverConfig?.mutationCallback,
  };

  const mutationObserver = new MutationObserver(
    mutationObserverCallback.bind(container)
  );

  mutationObserver.observe(win.document.body, {
    ...DEFAULT_MUTATION_OBSERVER_CONFIG,
    ...(Cypress.config().cypressMutationObserverConfig?.mutationObserverInit ||
      {}),
  });
  container.mutationObserver = mutationObserver;

  win.document.mutationObserverContainer = container;
}

Cypress.on("window:load", initializeMutationObserver);
