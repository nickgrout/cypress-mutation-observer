import {ASYNC_SITE} from  '../support/constants'

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
      .visit(ASYNC_SITE)
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
});
