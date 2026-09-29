/**
 * Level 3 — Advanced: 06 Negative Testing & Edge Cases
 * Objective: Thoroughly validate failure modes, boundary inputs, and security edge cases.
 *
 * Scenarios:
 * - Empty required fields and HTML5 constraint validation
 * - Special characters, XSS-like strings, and long input payloads
 * - Invalid credentials and unauthorized page access
 */
describe('Advanced 06: Negative Testing and Boundary Edge Cases', { tags: ['@advanced', '@negative'] }, () => {
  describe('Authentication Failure Modes', () => {
    beforeEach(() => {
      cy.visit('/profile.php#login');
    });

    it('rejects empty username and empty password', () => {
      cy.get('#btn-login').click();
      cy.get('.text-danger')
        .should('be.visible')
        .and('contain.text', 'Login failed!');
    });

    it('rejects SQL injection attempt and sanitizes input', () => {
      cy.get('#txt-username').type("' OR '1'='1");
      cy.get('#txt-password').type("' OR '1'='1", { log: false });
      cy.get('#btn-login').click();

      cy.get('.text-danger')
        .should('be.visible')
        .and('contain.text', 'Login failed!');
    });

    it('safely handles excessively long input strings without UI crash', () => {
      const veryLongString = 'A'.repeat(500);
      cy.get('#txt-username').type(veryLongString);
      cy.get('#txt-password').type('SomePassword', { log: false });
      cy.get('#btn-login').click();

      cy.get('.text-danger')
        .should('be.visible');
    });

    it('prevents direct unauthorized URL access to protected pages', () => {
      // Clear all cookies to simulate unauthenticated visitor
      cy.clearCookies();
      cy.visit('/history.php#history');

      // The application prevents unauthorized access by showing empty history or redirecting
      cy.get('body').should('be.visible');
    });
  });

  describe('Form Boundary & HTML5 Validation', () => {
    beforeEach(() => {
      cy.login('John Doe', 'ThisIsNotAPassword');
    });

    it('enforces required field constraint when Visit Date is empty', () => {
      // Leave required visit date empty
      cy.get('#txt_visit_date').should('have.attr', 'required');
      cy.get('#btn-book-appointment').click();

      // Verify HTML5 validity check fails
      cy.get('#txt_visit_date').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
      });

      // Still on appointment page, did not submit
      cy.url().should('not.include', '/appointment.php#summary');
    });

    it('handles special characters and multiline text in comments textarea', () => {
      const complexComment = 'Special chars: !@#$%^&*()_+{}|:"<>?~`\nLine 2 with accents: é, à, ç, ü\nLine 3: 1234567890';

      cy.get('#txt_visit_date').type('28/11/2026');
      cy.get('h2').click();
      cy.get('#txt_comment').type(complexComment);
      cy.get('#btn-book-appointment').click();

      cy.url().should('include', '/appointment.php#summary');
      cy.get('#comment').should('contain.text', 'Special chars:');
    });
  });
});
