/**
 * Page Object representing the CURA Healthcare History Page
 */
class HistoryPage {
  // Elements
  get heading() {
    return cy.get('h2');
  }

  get appointmentPanels() {
    return cy.get('.panel.panel-info');
  }

  get noAppointmentText() {
    return cy.contains('p', 'No appointment.');
  }

  get homeButton() {
    return cy.contains('a', 'Go to Homepage');
  }

  // Actions & Verifications
  visit() {
    cy.visit('/history.php#history');
    return this;
  }

  verifyHasAppointments() {
    this.appointmentPanels.should('have.length.greaterThan', 0);
  }

  verifyAppointmentAt(index, { date, facility, readmission, program, comment }) {
    this.appointmentPanels.eq(index).within(() => {
      if (date) cy.get('.panel-heading').should('contain.text', date);
      if (facility) cy.get('#facility').should('have.text', facility);
      if (readmission) cy.get('#hospital_readmission').should('have.text', readmission);
      if (program) cy.get('#program').should('have.text', program);
      if (comment) cy.get('#comment').should('have.text', comment);
    });
  }

  goToHomepage() {
    this.homeButton.click();
  }
}

export default new HistoryPage();
