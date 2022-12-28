export const MUTATION_OBSERVER_EVENT_NAMES = {
  mutate: "mutationObserver:mutate",
  beforeCreate: "mutationObserver:before:create",
  afterCreate: "mutationObserver:after:create",
  beforeUnload: "mutationObserver:before:unload",
};

export const DEFAULT_MUTATION_OBSERVER_CONFIG: MutationObserverInit = {
  attributes: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true,
};

export const MIN_UPDATE_INTERVAL = 50; // min time since the last mutation required to have passed before the lastMutation can be updated, in ms
