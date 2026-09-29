/**
 * Level 2 — Intermediate: 04 Data-Driven Testing
 * Objective: Run parameterized tests over multiple datasets covering:
 * - Valid data
 * - Invalid data
 * - Boundary data
 * - Empty fields
 */
describe('Intermediate 04: Data-Driven Test Automation', { tags: ['@intermediate', '@data-driven'] }, () => {
  const credentialsMatrix = [
    {
      scenario: 'Empty Username',
      username: '',
      password: 'ThisIsNotAPassword',
      shouldSucceed: false
    },
    {
      scenario: 'Empty Password',
      username: 'John Doe',
      password: '',
      shouldSucceed: false
    },
    {
      scenario: 'Both Fields Empty',
      username: '',
      password: '',
      shouldSucceed: false
    },
    {
      scenario: 'Invalid Username with Valid Password',
      username: 'NonExistentUser123',
      password: 'ThisIsNotAPassword',
      shouldSucceed: false
    },
    {
      scenario: 'Valid Username with Incorrect Password',
      username: 'John Doe',
      password: 'WrongPassword999',
      shouldSucceed: false
    },
    {
      scenario: 'Boundary: Special Characters In Username',
      username: '!@#$%^&*()_+',
      password: 'ThisIsNotAPassword',
      shouldSucceed: false
    },
    {
      scenario: 'Valid Authentic Demo Credentials',
      username: 'John Doe',
      password: 'ThisIsNotAPassword',
      shouldSucceed: true
    }
  ];

  credentialsMatrix.forEach(({ scenario, username, password, shouldSucceed }) => {
    it(`evaluates login scenario: ${scenario}`, () => {
      cy.visit('/profile.php#login');

      if (username) {
        cy.get('#txt-username').type(username);
      }
      if (password) {
        cy.get('#txt-password').type(password, { log: false });
      }

      cy.get('#btn-login').click();

      if (shouldSucceed) {
        cy.url().should('include', '#appointment');
        cy.get('h2').should('have.text', 'Make Appointment');
      } else {
        cy.get('.text-danger')
          .should('be.visible')
          .and('contain.text', 'Login failed! Please ensure the username and password are valid.');
      }
    });
  });

  const appointmentsMatrix = [
    {
      facility: 'Tokyo CURA Healthcare Center',
      hospitalReadmission: true,
      program: 'Medicare',
      visitDate: '01/11/2026',
      comment: 'Data-driven test appointment 1'
    },
    {
      facility: 'Hongkong CURA Healthcare Center',
      hospitalReadmission: false,
      program: 'Medicaid',
      visitDate: '10/11/2026',
      comment: 'Data-driven test appointment 2'
    },
    {
      facility: 'Seoul CURA Healthcare Center',
      hospitalReadmission: true,
      program: 'None',
      visitDate: '19/11/2026',
      comment: 'Data-driven test appointment 3'
    }
  ];

  appointmentsMatrix.forEach((appointment, index) => {
    it(`submits appointment dataset #${index + 1} (${appointment.facility} - ${appointment.program})`, () => {
      cy.login('John Doe', 'ThisIsNotAPassword');
      cy.bookAppointment(appointment);
      cy.verifyAppointmentSummary(appointment);
    });
  });
});
