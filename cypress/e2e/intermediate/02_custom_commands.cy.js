/**
 * Level 2 — Intermediate: 02 Custom Commands
 * Objective: Demonstrate how custom commands streamline tests, eliminate code repetition,
 * and provide readable, business-level test flows.
 */
describe('Intermediate 02: Custom Commands Automation', { tags: ['@intermediate', '@commands'] }, () => {
  it('logs in, books appointment, verifies summary, and logs out with custom commands', () => {
    // 1. Reusable Login command
    cy.login('John Doe', 'ThisIsNotAPassword');

    // 2. Reusable Appointment Booking command
    const appointment = {
      facility: 'Hongkong CURA Healthcare Center',
      hospitalReadmission: true,
      program: 'Medicaid',
      visitDate: '28/10/2026',
      comment: 'Consultation scheduled via custom Cypress command'
    };

    cy.bookAppointment(appointment);

    // 3. Reusable summary assertion command
    cy.verifyAppointmentSummary(appointment);

    // 4. Reusable logout command
    cy.logout();
  });

  it('demonstrates sidebar toggle custom commands', () => {
    cy.visit('/');

    // Test open and close commands
    cy.openSidebar();
    cy.closeSidebar();
  });
});
