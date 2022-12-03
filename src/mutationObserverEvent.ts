const defaultMutationObserverConfig: MutationObserverInit = {
  attributes: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true,
};

const MIN_UPDATE_INTERVAL = 50; // min time since the last mutation required to have passed before the lastMutation can be updated, in ms

function mutationObserverCallback(records: MutationRecord[]) {
  if (
    this.lastMutation === undefined || 
    Date.now() - this.lastMutation > MIN_UPDATE_INTERVAL
  ) {
    this.lastMutation = Date.now();
    console.log(`document mutated: ${this.lastMutation}`);
    const recordsClone: MutationRecord[] = records.map(record => ({
      addedNodes: record.addedNodes,
      attributeName: record.attributeName,
      attributeNamespace: record.attributeNamespace,
      nextSibling: record.nextSibling,
      oldValue: record.oldValue,
      previousSibling: record.previousSibling,
      removedNodes: record.removedNodes,
      target: record.target,
      type: record.type,
    }))
    cy.emit("mutationObserver:mutate", records);
  }
}

export function windowLoad(win: Cypress.AUTWindow) {
  const mutationObserver = new MutationObserver(mutationObserverCallback);
  mutationObserver.observe(win.document.body, {
    ...defaultMutationObserverConfig,
    ...Cypress.config().mutationObserverConfig,
  });
  win.document.mutationObserverContainer = {
    mutationObserver,
    lastMutation: 0,
  };
}

Cypress.on("window:load", windowLoad);
