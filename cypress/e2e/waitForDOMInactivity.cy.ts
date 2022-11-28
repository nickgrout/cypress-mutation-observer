const SLOW_ASYNC_SITE = "https://www.airbnb.com/";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

describe("verify waitForDOMInactivity", () => {
  it("does not throw error", () => {
    cy.visit(SLOW_ASYNC_SITE, {
      headers: {
        accept: "application/json, text/plain, */*",
        "user-agent": "axios/0.27.2",
      },
    }).waitForDOMInactivity();
  });
  it("waits for DOM to stop mutating", () => {
    // without waiting
    cy.getCurrentTimeMs()
      .as("startTimeWithoutWait")
      .visit(SLOW_ASYNC_SITE, {
        headers: {
          accept: "application/json, text/plain, */*",
          "user-agent": "axios/0.27.2",
        },
      })
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
      .visit(SLOW_ASYNC_SITE, {
        headers: {
          accept: "application/json, text/plain, */*",
          "user-agent": "axios/0.27.2",
        },
      })
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
