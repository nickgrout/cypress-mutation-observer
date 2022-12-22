import {
  DEFAULT_MUTATION_OBSERVER_CONFIG,
  MUTATION_OBSERVER_EVENT_NAMES,
  MIN_UPDATE_INTERVAL,
} from "./constants";

function mutationObserverCallback(records: MutationRecord[]) {
  // throttle the number of mutation events/sec
  if (
    !this.lastMutation ||
    Date.now() - this.lastMutation > MIN_UPDATE_INTERVAL
  ) {
    this.lastMutation = Date.now();
    cy.emit(MUTATION_OBSERVER_EVENT_NAMES.mutate, records);
  }
}

/**
 * Initialize a new mutation observer on the current window document
 * @param win
 */
export default function initializeMutationObserver(win: Cypress.AUTWindow) {
  const container: MutationObserverContainer = {
    lastMutation: 0,
    mutationObserver: null,
  };
  win.document.mutationObserverContainer = container;

  const mutationObserver = new MutationObserver(
    mutationObserverCallback.bind(container)
  );

  const config = {
    ...DEFAULT_MUTATION_OBSERVER_CONFIG,
    ...Cypress.config().mutationObserverConfig,
  };
  mutationObserver.observe(win.document.body, config);

  container.mutationObserver = mutationObserver;
}

Cypress.on("window:load", initializeMutationObserver);
