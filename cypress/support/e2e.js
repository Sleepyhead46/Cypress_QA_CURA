// ***********************************************************
// This support/e2e.js is processed and loaded automatically before test files.
// ***********************************************************

// Import custom commands
import './commands';

// Import accessibility testing engine
import 'cypress-axe';

// Prevent 3rd-party script exceptions from failing tests arbitrarily
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  // on external bootstrap or analytics script issues
  return false;
});
