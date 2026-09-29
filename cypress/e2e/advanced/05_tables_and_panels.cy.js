/**
 * Level 3 — Advanced: 05 Tables and Structured Data Panels
 * Objective: Automate structured multi-record collections:
 * - Record/Row counts
 * - Column and field value validations
 * - Targeting specific rows/panels with .eq() and .within()
 * - Verifying data persistence and ordering across records
 */
describe('Advanced 05: Tables and Structured Record Automation', { tags: ['@advanced', '@tables'] }, () => {
  beforeEach(() => {
    // Fresh login session
    cy.visit('/profile.php#login');
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();
  });

  it('validates empty state prior to creating appointment records', () => {
    cy.visit('/history.php#history');
    cy.get('h2').should('have.text', 'History');
    cy.contains('p', 'No appointment.').should('be.visible');
  });

  it('books multiple appointments and validates structured records in history', () => {
    const record1 = {
      facility: 'Tokyo CURA Healthcare Center',
      hospitalReadmission: true,
      program: 'Medicare',
      visitDate: '10/11/2026',
      comment: 'First historical appointment record'
    };

    const record2 = {
      facility: 'Hongkong CURA Healthcare Center',
      hospitalReadmission: false,
      program: 'Medicaid',
      visitDate: '20/12/2026',
      comment: 'Second historical appointment record'
    };

    // Book Record 1
    cy.bookAppointment(record1);
    cy.url().should('include', '/appointment.php#summary');

    // Return to form and book Record 2
    cy.visit('/#appointment');
    cy.bookAppointment(record2);
    cy.url().should('include', '/appointment.php#summary');

    // Navigate to History page
    cy.visit('/history.php#history');

    // 1. Record Count: Assert multiple panels exist
    cy.get('.panel.panel-info').should('have.length', 2);

    // 2. Validate Row/Panel 1 values
    cy.get('.panel.panel-info').eq(0).within(() => {
      cy.get('.panel-heading').should('contain.text', record1.visitDate);
      cy.get('#facility').should('have.text', record1.facility);
      cy.get('#hospital_readmission').should('have.text', 'Yes');
      cy.get('#program').should('have.text', record1.program);
      cy.get('#comment').should('have.text', record1.comment);
    });

    // 3. Validate Row/Panel 2 values
    cy.get('.panel.panel-info').eq(1).within(() => {
      cy.get('.panel-heading').should('contain.text', record2.visitDate);
      cy.get('#facility').should('have.text', record2.facility);
      cy.get('#hospital_readmission').should('have.text', 'No');
      cy.get('#program').should('have.text', record2.program);
      cy.get('#comment').should('have.text', record2.comment);
    });
  });
});
