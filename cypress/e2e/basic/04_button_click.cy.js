/**
 * Level 1 — Beginner: Test 4
 * Objective: Demonstrate .click() and verify resulting page state.
 */
describe('Basic 04: Button Click Interactions', { tags: ['@basic'] }, () => {
  it('navigates to login page when clicking Make Appointment CTA', () => {
    cy.visit('/');

    // Click hero CTA button
    cy.get('#btn-make-appointment')
      .should('be.visible')
      .click();

    // Verify resulting page state
    cy.url().should('include', '/profile.php#login');
    cy.get('h2').should('have.text', 'Login');
    cy.get('#btn-login').should('be.visible');
  });

  it('triggers login and state transition on submit button click', () => {
    cy.visit('/profile.php#login');

    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');

    // Click submit button
    cy.get('#btn-login').click();

    // Verify resulting page state changed to appointment form
    cy.get('section#appointment').should('be.visible');
    cy.get('#btn-book-appointment').should('be.visible');
  });

  it('toggles sidebar navigation panel on menu button click', () => {
    cy.visit('/');

    // Initially sidebar wrapper is not active
    cy.get('#sidebar-wrapper').should('not.have.class', 'active');

    // Click hamburger button
    cy.get('#menu-toggle').click();

    // Verify state updated to active
    cy.get('#sidebar-wrapper').should('have.class', 'active');

    // Click close button
    cy.get('#menu-close').click();

    // Verify state closed
    cy.get('#sidebar-wrapper').should('not.have.class', 'active');
  });
});
