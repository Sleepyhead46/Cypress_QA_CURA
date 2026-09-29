/**
 * Page Object representing the CURA Healthcare Appointment Summary Confirmation Page
 */
class SummaryPage {
  // Elements
  get heading() {
    return cy.get('h2');
  }

  get leadText() {
    return cy.get('.lead');
  }

  get facility() {
    return cy.get('#facility');
  }

  get hospitalReadmission() {
    return cy.get('#hospital_readmission');
  }

  get program() {
    return cy.get('#program');
  }

  get visitDate() {
    return cy.get('#visit_date');
  }

  get comment() {
    return cy.get('#comment');
  }

  get homeButton() {
    return cy.contains('a', 'Go to Homepage');
  }

  // Verification
  verifySummary({
    facility,
    hospitalReadmission,
    program,
    visitDate,
    comment
  }) {
    this.heading.should('have.text', 'Appointment Confirmation');
    if (facility) this.facility.should('have.text', facility);
    if (hospitalReadmission !== undefined) {
      this.hospitalReadmission.should('have.text', hospitalReadmission ? 'Yes' : 'No');
    }
    if (program) this.program.should('have.text', program);
    if (visitDate) this.visitDate.should('have.text', visitDate);
    if (comment) this.comment.should('have.text', comment);
  }

  goToHomepage() {
    this.homeButton.click();
  }
}

export default new SummaryPage();
