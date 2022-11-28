import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const waitForDomInactivity = require('./src/waitForDOMInactivity')
    }
  }
})
