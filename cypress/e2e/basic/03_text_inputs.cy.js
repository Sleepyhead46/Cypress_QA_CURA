/**
 * Level 1 — Beginner: Test 3
 * Objective: Demonstrate .type(), .clear(), .should()
 * Validates text inputs with valid, invalid, and boundary data.
 */
describe('Basic 03: Text Input Handling and Validation', { tags: ['@basic', '@forms'] }, () => {
  beforeEach(() => {
    cy.visit('/profile.php#login');
  });

  it('demonstrates typing, clearing, and assertions on input values', () => {
    const inputField = cy.get('#txt-username');

    // Type text and assert value
    inputField.type('PreliminaryUser');
    inputField.should('have.value', 'PreliminaryUser');

    // Clear text and assert field is empty
    inputField.clear();
    inputField.should('have.value', '');

    // Re-type and check value
    inputField.type('John Doe');
    inputField.should('have.value', 'John Doe');
  });

  it('tests invalid input rejection displaying error message', () => {
    // Type invalid username
    cy.get('#txt-username').type('invalid_username_xyz');
    cy.get('#txt-password').type('wrong_password');
    cy.get('#btn-login').click();

    // Verify error banner is displayed
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Login failed! Please ensure the username and password are valid.');
  });

  it('tests valid input submission redirecting to appointment section', () => {
    cy.get('#txt-username').clear().type('John Doe');
    cy.get('#txt-password').clear().type('ThisIsNotAPassword');
    cy.get('#btn-login').click();

    // Assert URL changed to the authenticated appointment screen
    cy.url().should('include', '#appointment');
    cy.get('h2').should('have.text', 'Make Appointment');
  });
});
