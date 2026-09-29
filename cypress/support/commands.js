// ***********************************************************
// Custom Cypress Commands for CURA Healthcare E2E Automation
// ***********************************************************

/**
 * Custom command to perform user authentication
 * @param {string} username - login username
 * @param {string} password - login password
 */
Cypress.Commands.add('login', (username = 'John Doe', password = 'ThisIsNotAPassword') => {
  cy.visit('/profile.php#login');
  cy.get('#txt-username').should('be.visible').clear().type(username);
  // Using { log: false } on sensitive data prevents sensitive passwords leaking in Cypress logs
  cy.get('#txt-password').should('be.visible').clear().type(password, { log: false });
  cy.get('#btn-login').should('be.visible').click();
});

/**
 * Custom command to open the sidebar navigation menu
 */
Cypress.Commands.add('openSidebar', () => {
  cy.get('#menu-toggle').should('be.visible').click();
  cy.get('#sidebar-wrapper').should('have.class', 'active');
});

/**
 * Custom command to close the sidebar navigation menu
 */
Cypress.Commands.add('closeSidebar', () => {
  cy.get('#menu-close').should('be.visible').click();
  cy.get('#sidebar-wrapper').should('not.have.class', 'active');
});

/**
 * Custom command to navigate using the sidebar
 * @param {string} linkText - Home, History, Profile, or Logout
 */
Cypress.Commands.add('navigateViaSidebar', (linkText) => {
  cy.openSidebar();
  cy.get('#sidebar-wrapper').contains('a', linkText).click();
});

/**
 * Custom command to logout the current session
 */
Cypress.Commands.add('logout', () => {
  cy.navigateViaSidebar('Logout');
  cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  cy.get('#btn-make-appointment').should('be.visible');
});

/**
 * Custom command to fill and submit the appointment booking form
 * @param {Object} details - appointment details
 */
Cypress.Commands.add('bookAppointment', ({
  facility = 'Tokyo CURA Healthcare Center',
  hospitalReadmission = false,
  program = 'Medicare',
  visitDate = '15/10/2026',
  comment = 'Automated appointment test'
} = {}) => {
  cy.get('#combo_facility').should('be.visible').select(facility);

  if (hospitalReadmission) {
    cy.get('#chk_hospotal_readmission').check().should('be.checked');
  } else {
    cy.get('#chk_hospotal_readmission').uncheck().should('not.be.checked');
  }

  // Radio button program selection
  const programSelector = {
    'Medicare': '#radio_program_medicare',
    'Medicaid': '#radio_program_medicaid',
    'None': '#radio_program_none'
  }[program] || '#radio_program_medicare';

  cy.get(programSelector).check().should('be.checked');

  // Fill visit date and comment
  cy.get('#txt_visit_date').clear().type(visitDate);
  // Click outside to dismiss bootstrap datepicker popup cleanly
  cy.get('h2').contains('Make Appointment').click();

  if (comment) {
    cy.get('#txt_comment').clear().type(comment);
  }

  cy.get('#btn-book-appointment').click();
});

/**
 * Custom assertion command to verify appointment confirmation summary
 * @param {Object} expected - expected appointment details
 */
Cypress.Commands.add('verifyAppointmentSummary', ({
  facility,
  hospitalReadmission,
  program,
  visitDate,
  comment
}) => {
  cy.url().should('include', '/appointment.php#summary');
  cy.get('h2').should('have.text', 'Appointment Confirmation');
  
  if (facility) {
    cy.get('#facility').should('have.text', facility);
  }
  if (hospitalReadmission !== undefined) {
    cy.get('#hospital_readmission').should('have.text', hospitalReadmission ? 'Yes' : 'No');
  }
  if (program) {
    cy.get('#program').should('have.text', program);
  }
  if (visitDate) {
    cy.get('#visit_date').should('have.text', visitDate);
  }
  if (comment) {
    cy.get('#comment').should('have.text', comment);
  }
});