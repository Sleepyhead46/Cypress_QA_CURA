/**
 * Level 2 — Intermediate: 01 Fixtures
 * Objective: Demonstrate cy.fixture() to decouple test data from test scripts.
 * Uses: users.json, appointments.json, testData.json
 */
describe('Intermediate 01: Fixture-Driven Automation', { tags: ['@intermediate'] }, () => {
  beforeEach(() => {
    // Load fixtures into Mocha test context using alias or cy.fixture
    cy.fixture('users').as('userData');
    cy.fixture('appointments').as('appointmentData');
    cy.fixture('testData').as('siteData');
  });

  it('authenticates using user fixture data', function () {
    const { validUser } = this.userData;

    cy.visit('/profile.php#login');
    cy.get('#txt-username').type(validUser.username);
    cy.get('#txt-password').type(validUser.password, { log: false });
    cy.get('#btn-login').click();

    // Verify authenticated landing section
    cy.url().should('include', '#appointment');
    cy.get('h2').should('have.text', this.siteData.appointmentForm.heading);
  });

  it('books an appointment using appointment fixture data', function () {
    const { validUser } = this.userData;
    const { singleAppointment } = this.appointmentData;

    // Login
    cy.visit('/profile.php#login');
    cy.get('#txt-username').type(validUser.username);
    cy.get('#txt-password').type(validUser.password, { log: false });
    cy.get('#btn-login').click();

    // Use fixture data for appointment fields
    cy.get('#combo_facility').select(singleAppointment.facility);

    if (singleAppointment.hospitalReadmission) {
      cy.get('#chk_hospotal_readmission').check();
    }

    if (singleAppointment.program === 'Medicaid') {
      cy.get('#radio_program_medicaid').check();
    }

    cy.get('#txt_visit_date').type(singleAppointment.visitDate);
    cy.get('h2').click(); // dismiss calendar
    cy.get('#txt_comment').type(singleAppointment.comment);
    cy.get('#btn-book-appointment').click();

    // Verify confirmation summary matches fixture data
    cy.url().should('include', '/appointment.php#summary');
    cy.get('#facility').should('have.text', singleAppointment.facility);
    cy.get('#hospital_readmission').should('have.text', singleAppointment.hospitalReadmission ? 'Yes' : 'No');
    cy.get('#program').should('have.text', singleAppointment.program);
    cy.get('#visit_date').should('have.text', singleAppointment.visitDate);
    cy.get('#comment').should('have.text', singleAppointment.comment);
  });
});
