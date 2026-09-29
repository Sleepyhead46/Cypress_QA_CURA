/**
 * Level 3 — Advanced: 04 Dynamic Elements & Selector Resilience
 * Objective: Handle asynchronous DOM updates, delayed elements, and dynamic animations.
 *
 * Selector Best Practices Note:
 * - Brittle Selector (BAD): cy.get('.col-sm-offset-3 > div:nth-child(4)')
 *   Why it's bad: Tight coupling to DOM nesting. Any layout, bootstrap, or styling change breaks the test.
 * - Resilient Selector (GOOD): cy.get('#combo_facility'), cy.get('[name="visit_date"]'), cy.get('#btn-login')
 *   Why it's good: Bound to unique functional attributes that remain stable across visual and structural refactoring.
 */
describe('Advanced 04: Dynamic Element Handling and Resilient Selectors', { tags: ['@advanced', '@dynamic'] }, () => {
  beforeEach(() => {
    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();
  });

  it('interacts with dynamic Bootstrap datepicker widget without brittle index selectors', () => {
    // Click the date input container
    cy.get('#txt_visit_date').should('be.visible').click();

    // The bootstrap datepicker dynamically injects a widget into the DOM: .datepicker.datepicker-dropdown
    cy.get('.datepicker.datepicker-dropdown')
      .should('be.visible')
      .within(() => {
        // Find today's date or active cell using semantic classes instead of brittle nth-child
        cy.get('.datepicker-days td.day:not(.old):not(.new)')
          .contains('15')
          .click();
      });

    // Verify date was populated dynamically
    cy.get('#txt_visit_date').should('not.have.value', '');
  });

  it('handles animated sliding sidebar with automatic retry assertions', () => {
    // Initial state: Off-screen, width 0, no active class
    cy.get('#sidebar-wrapper').should('not.have.class', 'active');

    // Trigger open animation
    cy.get('#menu-toggle').click();

    // Cypress automatically retries until class 'active' is applied and element becomes interactive
    cy.get('#sidebar-wrapper')
      .should('have.class', 'active')
      .within(() => {
        cy.contains('a', 'History').should('be.visible');
        cy.contains('a', 'Profile').should('be.visible');
      });

    // Trigger close animation
    cy.get('#menu-close').click();
    cy.get('#sidebar-wrapper').should('not.have.class', 'active');
  });

  it('dynamically adapts to changing text based on form submissions', () => {
    // Fill appointment
    cy.get('#combo_facility').select('Seoul CURA Healthcare Center');
    cy.get('#txt_visit_date').type('29/11/2026');
    cy.get('h2').click();
    cy.get('#btn-book-appointment').click();

    // Dynamic text on summary page
    cy.get('h2')
      .should('be.visible')
      .and('have.text', 'Appointment Confirmation');

    cy.get('#facility')
      .should('be.visible')
      .and('contain.text', 'Seoul');
  });
});
