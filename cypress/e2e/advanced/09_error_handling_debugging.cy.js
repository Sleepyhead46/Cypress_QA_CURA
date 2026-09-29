/**
 * Level 3 — Advanced: 09 Error Handling & Debugging Techniques
 * Objective: Demonstrate effective troubleshooting, diagnostic logging,
 * and contrast automatic retry mechanisms against anti-pattern hard sleeps.
 *
 * Flakiness & Debugging Philosophy:
 * - Anti-Pattern: cy.wait(5000)
 *   Arbitrary sleeps slow suites down, still fail under slow network conditions, and mask root causes.
 * - Best Practice: Cypress Automatic Retry
 *   Commands like cy.get() and .should() automatically query the DOM until assertions pass
 *   or defaultCommandTimeout expires.
 * - Diagnostics: Use cy.log(), cy.screenshot(), console.log inside .then(), and debugger statements.
 */
describe('Advanced 09: Diagnostics, Debugging, and Retry Mechanism', { tags: ['@advanced', '@debugging'] }, () => {
  it('demonstrates built-in automatic retries instead of arbitrary sleeps', () => {
    cy.visit('/profile.php#login');

    // Logging diagnostic information in the Cypress Command Log
    cy.log('Step 1: Entering credentials');

    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();

    cy.log('Step 2: Awaiting page transition with automatic retry');

    // Cypress retries this assertion continuously until it passes or times out
    cy.url().should('include', '#appointment');
    cy.get('h2').should('have.text', 'Make Appointment');
  });

  it('demonstrates deep element inspection using .then() and explicit logging', () => {
    cy.visit('/profile.php#login');

    // Use .then() to yield native DOM element for low-level property diagnostics
    cy.get('#btn-login').then(($button) => {
      const buttonText = $button.text().trim();
      const tagName = $button.prop('tagName');
      const isEnabled = !$button.prop('disabled');

      cy.log(`Diagnostic Info: Tag=<${tagName}>, Text="${buttonText}", Enabled=${isEnabled}`);

      expect(buttonText).to.eq('Login');
      expect(isEnabled).to.be.true;
    });
  });

  it('captures custom on-demand diagnostic screenshot during critical flows', () => {
    cy.visit('/');

    cy.get('#btn-make-appointment').should('be.visible');

    // Take an on-demand debug screenshot with timestamp
    cy.screenshot(`diagnostic-snapshot-${Date.now()}`);
  });
});
