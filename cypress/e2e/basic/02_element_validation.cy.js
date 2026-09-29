/**
 * Level 1 — Beginner: Test 2
 * Objective: Validate various DOM elements using cy.get(), cy.contains(), cy.should(), cy.and()
 * Validates: buttons, links, text, inputs, dropdowns, checkboxes, radio buttons
 */
describe('Basic 02: Element Validation with Chained Assertions', { tags: ['@basic', '@ui'] }, () => {
  it('validates buttons, links, and footer texts on homepage', () => {
    cy.visit('/');

    // 1. Button / Link Validation using cy.get() and cy.contains()
    cy.get('#btn-make-appointment')
      .should('be.visible')
      .and('have.attr', 'href', './profile.php#login')
      .and('contain.text', 'Make Appointment');

    // 2. Navigation toggle button
    cy.get('#menu-toggle')
      .should('be.visible')
      .and('have.class', 'btn-dark');

    // 3. Text content in footer
    cy.contains('strong', 'CURA Healthcare Service')
      .should('be.visible');

    cy.contains('Atlanta 550 Pharr Road NE Suite 525')
      .should('be.visible');

    // 4. Social links have expected icons
    cy.get('ul.list-inline li a')
      .should('have.length', 3)
      .and('be.visible');
  });

  it('validates inputs, dropdowns, checkboxes, and radio buttons on appointment form', () => {
    // Login to reach appointment form elements
    cy.visit('/profile.php#login');

    // 5. Input Validation on login page
    cy.get('#txt-username')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Username');

    cy.get('#txt-password')
      .should('be.visible')
      .and('have.attr', 'type', 'password');

    cy.get('#btn-login')
      .should('be.visible')
      .and('have.text', 'Login')
      .click();

    // Fill valid credentials to unlock appointment form
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');
    cy.get('#btn-login').click();

    // 6. Dropdown Validation
    cy.get('#combo_facility')
      .should('be.visible')
      .and('have.prop', 'tagName', 'SELECT')
      .find('option')
      .should('have.length', 3);

    // 7. Checkbox Validation
    cy.get('#chk_hospotal_readmission')
      .should('exist')
      .and('not.be.checked')
      .and('have.attr', 'value', 'Yes');

    // 8. Radio Buttons Validation
    cy.get('input[name="programs"]')
      .should('have.length', 3);

    cy.get('#radio_program_medicare')
      .should('be.checked');

    cy.get('#radio_program_medicaid')
      .should('not.be.checked');

    cy.get('#radio_program_none')
      .should('not.be.checked');

    // 9. Date input and comment textarea validation
    cy.get('#txt_visit_date')
      .should('be.visible')
      .and('have.attr', 'required');

    cy.get('#txt_comment')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Comment');
  });
});
