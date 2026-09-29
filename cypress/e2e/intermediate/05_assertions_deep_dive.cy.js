/**
 * Level 2 — Intermediate: 05 Assertions Deep Dive
 * Objective: Thoroughly demonstrate and explain Cypress assertion types:
 * 1. Visibility (.should('be.visible'), .should('not.be.visible'))
 * 2. Text (.should('contain.text'), .should('have.text'))
 * 3. Value (.should('have.value'))
 * 4. URL (cy.url().should('include'), cy.url().should('eq'))
 * 5. Attribute (.should('have.attr'), .should('have.class'))
 * 6. State (.should('be.checked'), .should('be.disabled'))
 */
describe('Intermediate 05: Assertions Masterclass', { tags: ['@intermediate', '@assertions'] }, () => {
  it('demonstrates visibility, attribute, and text assertions', () => {
    cy.visit('/');

    // 1. VISIBILITY: Asserts an element is rendered and not hidden by CSS display/visibility/opacity
    cy.get('#btn-make-appointment').should('be.visible');

    // Asserts an off-screen/closed element is not visible or not having active class
    cy.get('#sidebar-wrapper').should('not.have.class', 'active');

    // 2. TEXT:
    // 'have.text' matches the exact trimmed inner text
    cy.get('header#top h1').should('have.text', 'CURA Healthcare Service');

    // 'contain.text' matches substrings
    cy.get('footer').should('contain.text', 'Atlanta 550 Pharr Road');

    // 3. ATTRIBUTE: Asserts element attributes and values
    cy.get('#btn-make-appointment')
      .should('have.attr', 'href')
      .and('include', 'profile.php#login');

    // Asserts CSS classes
    cy.get('#menu-toggle').should('have.class', 'btn-dark');
  });

  it('demonstrates value, URL, and state assertions on forms', () => {
    // 4. URL: Asserts the browser address bar contents
    cy.visit('/profile.php#login');
    cy.url().should('include', '/profile.php#login');

    // 5. VALUE: Asserts the .val() property of input/select controls
    cy.get('#txt-username').type('John Doe').should('have.value', 'John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();

    // 6. STATE: Checks element interactive state (checked, disabled, selected)
    // Checkbox unchecked state
    cy.get('#chk_hospotal_readmission')
      .should('not.be.checked')
      .check()
      .should('be.checked');

    // Radio button state
    cy.get('#radio_program_medicare').should('be.checked');
    cy.get('#radio_program_medicaid')
      .should('not.be.checked')
      .check()
      .should('be.checked');

    // Demo account username input on login page has readonly attribute/state:
    cy.visit('/profile.php#login');
    cy.get('.alert-info input[placeholder="Username"]')
      .should('have.attr', 'readonly');
  });
});
