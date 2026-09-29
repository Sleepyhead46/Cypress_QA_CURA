/**
 * Level 1 — Beginner: Test 5
 * Objective: Demonstrate .select() and verify the selected options.
 */
describe('Basic 05: Dropdown Select Interactions', { tags: ['@basic', '@forms'] }, () => {
  beforeEach(() => {
    // Authenticate to access facility dropdown
    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
    cy.get('#combo_facility').should('be.visible');
  });

  it('selects option by visible text and verifies value', () => {
    // Default selected facility is Tokyo
    cy.get('#combo_facility').should('have.value', 'Tokyo CURA Healthcare Center');

    // Select Hongkong by text
    cy.get('#combo_facility').select('Hongkong CURA Healthcare Center');
    cy.get('#combo_facility').should('have.value', 'Hongkong CURA Healthcare Center');

    // Select Seoul by text
    cy.get('#combo_facility').select('Seoul CURA Healthcare Center');
    cy.get('#combo_facility').should('have.value', 'Seoul CURA Healthcare Center');
  });

  it('selects option by value and verifies currently selected option text', () => {
    // Select Tokyo option by value
    cy.get('#combo_facility').select('Tokyo CURA Healthcare Center');

    // Assert using selected pseudo-class
    cy.get('#combo_facility option:selected')
      .should('have.text', 'Tokyo CURA Healthcare Center');
  });
});
