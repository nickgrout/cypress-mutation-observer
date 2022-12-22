import { ASYNC_SITE } from "../support/constants";

describe("verify waitForDOMInactivity", () => {
  it("does not throw error", () => {
    cy.visitWithAutomationHeaders(ASYNC_SITE).waitForDOMInactivity();
  });
  it("waits for DOM to stop mutating", () => {
    // without waiting
    cy.getCurrentTimeMs()
      .as("startTimeWithoutWait")
      .visitWithAutomationHeaders(ASYNC_SITE)
      .getCurrentTimeMs()
      .then((endTime) => {
        return cy
          .get("@startTimeWithoutWait")
          .then((startTime: unknown) => endTime - (startTime as number));
      })
      .as("timeWithoutWait");

    // With waiting
    cy.getCurrentTimeMs()
      .as("startTimeWithWait")
      .visitWithAutomationHeaders(ASYNC_SITE)
      .waitForDOMInactivity()
      .getCurrentTimeMs()
      .then((endTime) => {
        return cy
          .get("@startTimeWithWait")
          .then((startTime: unknown) => endTime - (startTime as number));
      })
      .as("timeWithWait");

    cy.get("@timeWithoutWait").then((time: unknown) => cy.log(String(time)));
    cy.get("@timeWithWait").then((time: unknown) => cy.log(String(time)));
    cy.get("@timeWithoutWait").then((timeWithoutWait) =>
      cy.get("@timeWithWait").should("be.greaterThan", timeWithoutWait)
    );
  });

  it("has the correct time since the last mutation", () => {
    function testMutationObserverCallback(records: MutationRecord[]) {
      if (
        !this.testContainer.timeSinceLastMutation ||
        Date.now() - this.testContainer.timeSinceLastMutation > 50
      ) {
        console.log("now");
        this.testContainer.timeSinceLastMutation = Date.now();
      }
    }

    const testContainer = {
      timeSinceLastMutation: 0,
    };

    cy.once("window:load", (win) => {
      console.log("loading mutation observer");
      (win.document as any)._testMutationObserver = new MutationObserver(
        testMutationObserverCallback.bind({ testContainer })
      );
      (win.document as any)._testMutationObserver.observe(win.document, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    });

    cy.visitWithAutomationHeaders(ASYNC_SITE)
      .waitForDOMInactivity()
      .window()
      .then((win) => win.document.mutationObserverContainer.lastMutation)
      .then((lastMutation) => {
        cy.log(`diff: ${lastMutation - testContainer.timeSinceLastMutation}`);
      });
  });
});
