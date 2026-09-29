/**
 * Level 2 — Intermediate: 03 Page Object Model (POM)
 * Objective: Demonstrate Page Object pattern for clean separation of UI structure and test logic.
 *
 * POM Architectural Note:
 * - Why use POM: Encapsulates selector changes, prevents fragile tests, separates test intent from DOM details.
 * - When NOT to overuse POM: Avoid wrapping every single Cypress assertion in trivial page object getters;
 *   do not create monolithic GOD objects; keep POM focused on page-specific structures and high-level workflows.
 */
import loginPage from '../../pages/LoginPage';
import appointmentPage from '../../pages/AppointmentPage';
import summaryPage from '../../pages/SummaryPage';
import navbar from '../../pages/Navbar';

describe('Intermediate 03: Page Object Model Implementation', { tags: ['@intermediate', '@pom'] }, () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('validates login page visual elements and enters valid credentials', () => {
    loginPage.heading.should('have.text', 'Login');
    loginPage.demoAccountBox.should('be.visible');

    loginPage.login('John Doe', 'ThisIsNotAPassword');

    // Confirm navigation to appointment page
    appointmentPage.heading.should('have.text', 'Make Appointment');
  });

  it('completes appointment booking using Page Objects and verifies summary', () => {
    loginPage.login('John Doe', 'ThisIsNotAPassword');

    const appointmentDetails = {
      facility: 'Seoul CURA Healthcare Center',
      hospitalReadmission: true,
      program: 'None',
      visitDate: '12/11/2026',
      comment: 'Cardio stress test referral booked with POM'
    };

    appointmentPage.bookAppointment(appointmentDetails);

    // Verify via Summary Page Object
    summaryPage.verifySummary(appointmentDetails);

    // Return to homepage via Summary Page Object
    summaryPage.goToHomepage();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('performs navigation and logout using Navbar Page Object', () => {
    loginPage.login('John Doe', 'ThisIsNotAPassword');

    // Navigate to History page via Navbar
    navbar.navigateTo('History');
    cy.url().should('include', '/history.php#history');

    // Logout via Navbar
    navbar.navigateTo('Logout');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });
});
