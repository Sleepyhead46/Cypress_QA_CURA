/**
 * Level 1 — Beginner: Test 7
 * Objective: Demonstrate browser navigation history, internal links, and URL transitions.
 * Features: cy.go('back'), cy.go('forward')
 */
describe('Basic 07: Browser Navigation and History Controls', { tags: ['@basic'] }, () => {
  it('navigates through links and verifies browser back and forward history', () => {
    // 1. Visit Home
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);

    // 2. Click CTA to go to Login
    cy.get('#btn-make-appointment').click();
    cy.url().should('include', '/profile.php#login');
    cy.get('h2').should('have.text', 'Login');

    // 3. Browser Back
    cy.go('back');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('#btn-make-appointment').should('be.visible');

    // 4. Browser Forward
    cy.go('forward');
    cy.url().should('include', '/profile.php#login');
    cy.get('h2').should('have.text', 'Login');
  });

  it('navigates via sidebar internal links', () => {
    cy.visit('/');

    // Open sidebar
    cy.get('#menu-toggle').click();

    // Click Login link in sidebar
    cy.get('#sidebar-wrapper').contains('a', 'Login').click();
    cy.url().should('include', '/profile.php#login');

    // Open sidebar again and navigate back to Home
    cy.get('#menu-toggle').click();
    cy.get('#sidebar-wrapper').contains('a', 'Home').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});
