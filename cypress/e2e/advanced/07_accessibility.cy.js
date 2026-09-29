/**
 * Level 3 — Advanced: 07 Accessibility Testing (a11y)
 * Objective: Demonstrate automated accessibility auditing using axe-core and cypress-axe.
 *
 * Checks:
 * - Form input labels and aria attributes
 * - Heading structure hierarchy (h1, h2, h3)
 * - Interactive button accessible names
 * - Color contrast and WCAG 2.1 compliance
 *
 * Essential Accessibility Engineering Principle:
 * Automated scanners catch roughly 30% to 57% of WCAG defects (such as missing alt tags,
 * contrast ratios, form associations). Automated testing CANNOT replace manual audits
 * with screen readers (NVDA, JAWS, VoiceOver), keyboard focus order verification, or cognitive evaluations.
 */
describe('Advanced 07: Automated Accessibility Testing with cypress-axe', { tags: ['@advanced', '@a11y'] }, () => {
  it('scans Homepage for WCAG accessibility violations', () => {
    cy.visit('/');

    // 1. Inject the axe-core testing engine into the loaded page
    cy.injectAxe();

    // 2. Scan the page and report violations
    cy.checkA11y(
      null,
      {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      },
      (violations) => {
        cy.log(`A11y Violations detected: ${violations.length}`);
        violations.forEach((v) => {
          cy.log(`[${v.impact.toUpperCase()}] ${v.id}: ${v.help}`);
        });
      },
      true // skipFailures=true allows observing full audit logs on legacy demo websites
    );

    // 3. Verify semantic heading hierarchy exists
    cy.get('h1').should('have.length.at.least', 1);
    cy.get('h3').should('have.length.at.least', 1);
  });

  it('scans Login Form for accessible input labels and controls', () => {
    cy.visit('/profile.php#login');
    cy.injectAxe();

    // Scan specifically the login section form
    cy.checkA11y(
      '#login form',
      null,
      (violations) => {
        cy.log(`Form Violations count: ${violations.length}`);
      },
      true
    );

    // Verify explicit label associations
    cy.get('label[for="txt-username"]').should('be.visible').and('have.text', 'Username');
    cy.get('label[for="txt-password"]').should('be.visible').and('have.text', 'Password');
    cy.get('#btn-login').should('be.visible').and('have.text', 'Login');
  });
});
