/**
 * Page Object representing the CURA Healthcare Appointment Page
 */
class AppointmentPage {
  // Elements
  get heading() {
    return cy.get('h2');
  }

  get facilityDropdown() {
    return cy.get('#combo_facility');
  }

  get hospitalReadmissionCheckbox() {
    return cy.get('#chk_hospotal_readmission');
  }

  get medicareRadio() {
    return cy.get('#radio_program_medicare');
  }

  get medicaidRadio() {
    return cy.get('#radio_program_medicaid');
  }

  get noneRadio() {
    return cy.get('#radio_program_none');
  }

  get visitDateInput() {
    return cy.get('#txt_visit_date');
  }

  get commentInput() {
    return cy.get('#txt_comment');
  }

  get bookAppointmentButton() {
    return cy.get('#btn-book-appointment');
  }

  // Actions
  selectFacility(facility) {
    this.facilityDropdown.select(facility);
    return this;
  }

  setHospitalReadmission(apply) {
    if (apply) {
      this.hospitalReadmissionCheckbox.check();
    } else {
      this.hospitalReadmissionCheckbox.uncheck();
    }
    return this;
  }

  selectProgram(program) {
    const radios = {
      'Medicare': this.medicareRadio,
      'Medicaid': this.medicaidRadio,
      'None': this.noneRadio
    };
    (radios[program] || this.medicareRadio).check();
    return this;
  }

  setVisitDate(date) {
    this.visitDateInput.clear().type(date);
    // Dismiss bootstrap calendar popup
    this.heading.click();
    return this;
  }

  setComment(comment) {
    if (comment) {
      this.commentInput.clear().type(comment);
    } else {
      this.commentInput.clear();
    }
    return this;
  }

  clickBookAppointment() {
    this.bookAppointmentButton.click();
  }

  bookAppointment({
    facility = 'Tokyo CURA Healthcare Center',
    hospitalReadmission = false,
    program = 'Medicare',
    visitDate = '20/10/2026',
    comment = ''
  }) {
    this.selectFacility(facility);
    this.setHospitalReadmission(hospitalReadmission);
    this.selectProgram(program);
    this.setVisitDate(visitDate);
    this.setComment(comment);
    this.clickBookAppointment();
  }
}

export default new AppointmentPage();
