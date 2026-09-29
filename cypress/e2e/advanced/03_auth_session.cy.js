/**
 * Level 3 — Advanced: 03 Authentication and Session Management
 * Objective: Demonstrate cy.session() to cache authentication state and avoid redundant UI logins.
 *
 * Session Architecture Notes:
 * - Session Caching: Cypress saves cookies, localStorage, and sessionStorage associated with the session ID.
 * - Performance: Subsequent tests restore the session in milliseconds instead of repeating UI login clicks.
 * - Session Isolation: By default between tests, Cypress clears state. cy.session() creates a deterministic,
 *   reusable snapshot across multiple tests in a suite or across specs.
 */
describe('Advanced 03: Session Management with cy.session()', { tags: ['@advanced', '@session'] }, () => {
  const credentials = {
    username: 'John Doe',
    password: 'ThisIsNotAPassword'
  };

  // Reusable session definition
  const loginWithSession = (user = credentials.username, pass = credentials.password) => {
    cy.session([user, pass], () => {
      cy.visit('/profile.php#login');
      cy.get('#txt-username').type(user);
      cy.get('#txt-password').type(pass, { log: false });
      cy.get('#btn-login').click();
      cy.url().should('include', '#appointment');
    }, {
      validate() {
        // Validate session is still authenticated by checking cookies
        cy.getCookie('PHPSESSID').should('exist');
      }
    });
  };

  beforeEach(() => {
    // Restore or create session
    loginWithSession();
  });

  it('Test A: instantly enters appointment form without repeated login steps', () => {
    cy.visit('/#appointment');
    cy.get('h2').should('have.text', 'Make Appointment');
    cy.get('#combo_facility').should('be.visible');
  });

  it('Test B: accesses history page with active cached session', () => {
    cy.visit('/history.php#history');
    cy.get('h2').should('have.text', 'History');
    // Session state persists
    cy.get('#sidebar-wrapper').should('exist');
  });

  it('Test C: books appointment directly inside restored session', () => {
    cy.visit('/#appointment');
    cy.get('#combo_facility').select('Tokyo CURA Healthcare Center');
    cy.get('#txt_visit_date').type('18/11/2026');
    cy.get('h2').click();
    cy.get('#txt_comment').type('Session cached appointment booking');
    cy.get('#btn-book-appointment').click();
    cy.url().should('include', '/appointment.php#summary');
    cy.get('#facility').should('have.text', 'Tokyo CURA Healthcare Center');
  });
});
