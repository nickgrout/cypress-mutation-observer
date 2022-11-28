import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    chromeWebSecurity: false,
  }
})
