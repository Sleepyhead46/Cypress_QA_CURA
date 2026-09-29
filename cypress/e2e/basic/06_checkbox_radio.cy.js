/**
 * Level 1 — Beginner: Test 6
 * Objective: Demonstrate .check() and .uncheck() for checkboxes and radio buttons.
 * Verifies checked and unchecked states.
 */
describe('Basic 06: Checkbox and Radio Button Automation', { tags: ['@basic', '@forms'] }, () => {
  beforeEach(() => {
    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();
    cy.get('#chk_hospotal_readmission').should('exist');
  });

  it('checks and unchecks hospital readmission checkbox', () => {
    const checkbox = cy.get('#chk_hospotal_readmission');

    // Initially unchecked
    checkbox.should('not.be.checked');

    // Check the box
    checkbox.check();
    checkbox.should('be.checked');

    // Uncheck the box
    checkbox.uncheck();
    checkbox.should('not.be.checked');
  });

  it('switches between healthcare program radio buttons and verifies single active selection', () => {
    // Medicare is selected by default
    cy.get('#radio_program_medicare').should('be.checked');
    cy.get('#radio_program_medicaid').should('not.be.checked');
    cy.get('#radio_program_none').should('not.be.checked');

    // Check Medicaid
    cy.get('#radio_program_medicaid').check().should('be.checked');
    cy.get('#radio_program_medicare').should('not.be.checked');
    cy.get('#radio_program_none').should('not.be.checked');

    // Check None
    cy.get('#radio_program_none').check().should('be.checked');
    cy.get('#radio_program_medicaid').should('not.be.checked');
  });
});
