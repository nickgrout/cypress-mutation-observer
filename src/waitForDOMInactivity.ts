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
  const waitTimeStart = Date.now();

  return cy
    .window()
    .then({ timeout: options.maxInactivityTimeMs + 100 }, (win) => {
      const mutationObserverContainer = win.document.mutationObserverContainer;
      return new Cypress.Promise((resolve, reject) => {
        function checkInactivityTime() {
          const totalWaitingTime = Date.now() - waitTimeStart;
          const timeSinceLastMutation =
            Date.now() - mutationObserverContainer.lastMutation;
          if (timeSinceLastMutation > options.minInactivityTimeMs) {
            console.log("DOM mutation activity is stable.");
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
  "waitForDOMInactivity",
  (
    options: WaitForDOMInactivityOptions = {
      minInactivityTimeMs: 1000,
      maxInactivityTimeMs: 5000,
      intervalMs: 100,
    }
  ) => waitForDOMInactivity(options)
);
