# cypress-mutation-observer

**Cypress Mutation Observer** uses the [DOM mutation observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to determine when the DOM has stopped mutating, making tests faster and more reliable.

## Initializing the package

`cypress-mutation-observer` extends Cypress' cy command.

Add this line to your project's cypress/support/commands.{js,.ts}:

```js
import 'cypress-wait-until';
```

## Background

It can be difficult to test SPAs sometimes because elements are constantly being added, updated and removed from the page.

This can be a problem because automation tools will locate then interact with an element. Automation tools can frequently attempt to locate elements which are "stale", causing tests to break. In addition SPAs often close modals or reset forms as data is loaded async which can also break tests.

Cypress has the ability to wait on network requests, but the test writer must ensure
that each pertinent network request is awaited correctly. In addition, web apps can change elements on the DOM without a network request (ex: opening/closing a modal), making it difficult to find a robust method for waiting until the page has stopped changing.