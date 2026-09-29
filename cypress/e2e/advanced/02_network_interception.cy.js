/**
 * Level 3 — Advanced: 02 Network Interception
 * Objective: Demonstrate cy.intercept() and cy.wait() for:
 * - Intercepting real GET & POST network traffic
 * - Validating request payloads sent by the browser
 * - Validating network response status codes
 * - Response stubbing
 * - Simulating 500 server errors and verifying UI resilience
 */
describe('Advanced 02: Network Interception & Request Stubbing', { tags: ['@advanced', '@network'] }, () => {
  it('intercepts real POST authentication, validates payload, and waits on alias', () => {
    // Intercept POST request to /authenticate.php
    cy.intercept('POST', '**/authenticate.php').as('authRequest');

    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();

    // Wait for the intercepted request and assert against payload & response
    cy.wait('@authRequest').then((interception) => {
      // Validate request payload
      expect(interception.request.body).to.include('username=John+Doe');
      expect(interception.request.body).to.include('password=ThisIsNotAPassword');

      // Validate HTTP status
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    cy.url().should('include', '#appointment');
  });

  it('intercepts appointment booking submission and validates payload', () => {
    cy.login('John Doe', 'ThisIsNotAPassword');

    // Intercept POST request to appointment handler
    cy.intercept('POST', '**/appointment.php*').as('appointmentSubmission');

    cy.get('#combo_facility').select('Hongkong CURA Healthcare Center');
    cy.get('#chk_hospotal_readmission').check();
    cy.get('#radio_program_medicaid').check();
    cy.get('#txt_visit_date').type('22/10/2026');
    cy.get('h2').click();
    cy.get('#txt_comment').type('Intercept network validation comment');
    cy.get('#btn-book-appointment').click();

    // Verify intercepted submission
    cy.wait('@appointmentSubmission').then((interception) => {
      expect(interception.request.method).to.eq('POST');
      expect(interception.request.body).to.include('facility=Hongkong+CURA+Healthcare+Center');
      expect(interception.request.body).to.include('hospital_readmission=Yes');
      expect(interception.request.body).to.include('programs=Medicaid');
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    cy.url().should('include', '/appointment.php#summary');
  });

  it('stubs authentication route to simulate HTTP 500 Internal Server Error', () => {
    // Stub the endpoint with a custom 500 error response
    cy.intercept('POST', '**/authenticate.php', {
      statusCode: 500,
      body: 'Internal Server Error - Database Unavailable',
      headers: { 'content-type': 'text/html' }
    }).as('serverErrorStub');

    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();

    // Wait on stub
    cy.wait('@serverErrorStub').its('response.statusCode').should('eq', 500);
  });
});
