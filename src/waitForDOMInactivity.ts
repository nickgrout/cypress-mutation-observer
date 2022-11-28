
export default function waitForDOMInactivity(
  options: WaitForDOMInactivityOptions = {
    minInactivityTimeMs: 1000,
    maxInactivityTimeMs: 5000,
    intervalMs: 100,
  }
) {
  Cypress.log({
    name: "waitForDOMInactivity",
    message: `Wait for ${options.minInactivityTimeMs} of DOM inactivity.`,
    consoleProps: () => options,
  });
  let lastMutation = Date.now();
  const observer = new MutationObserver(observerCallback);
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
  const waitTimeStart = Date.now();

  function observerCallback() {
    lastMutation = Date.now();
  }

  return cy.then(() => {
    return new Cypress.Promise((resolve, reject) => {
      function checkInactivityTime() {
        const totalWaitingTime = Date.now() - waitTimeStart;
        const timeSinceLastMutation = Date.now() - lastMutation;
        if (timeSinceLastMutation > options.minInactivityTimeMs) {
          console.log("DOM activity is stable.");
          // observer.disconnect();
          Cypress.log({
            name: "waitForDOMInactivity",
            message: `DOM took ${totalWaitingTime} to stop mutating`,
            consoleProps: () => options,
          });
          resolve();
        } else if (totalWaitingTime > options.maxInactivityTimeMs) {
          reject(
            new Error(
              `DOM did not stop changing after ${options.maxInactivityTimeMs}ms`
            )
          );
        } else {
          setTimeout(checkInactivityTime, options.intervalMs);
        }
      }
      setTimeout(checkInactivityTime, options.intervalMs);
    });
  });
}

Cypress.Commands.add(
  'waitForDOMInactivity',
  (
    options: WaitForDOMInactivityOptions = {
      minInactivityTimeMs: 1000,
      maxInactivityTimeMs: 5000,
      intervalMs: 100,
    },
  ) => waitForDOMInactivity(options));