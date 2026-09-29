/**
 * Level 1 — Beginner: Test 1
 * Objective: Open website, verify URL, page title, main headings, and capture a screenshot.
 */
describe('Basic 01: Open Website and Verify Header Elements', { tags: ['@smoke', '@basic'] }, () => {
  beforeEach(() => {
    // Visit the home page using baseUrl defined in cypress.config.js
    cy.visit('/');
  });

  it('should successfully load the website and display correct URL', () => {
    // Verify the URL matches the expected base domain
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('should display the correct page title in browser tab', () => {
    // Verify document title
    cy.title().should('eq', 'CURA Healthcare Service');
  });

  it('should display the main header and sub-heading texts', () => {
    // Verify primary hero heading
    cy.get('header#top h1')
      .should('be.visible')
      .and('have.text', 'CURA Healthcare Service');

    // Verify sub-heading text
    cy.get('header#top h3')
      .should('be.visible')
      .and('have.text', 'We Care About Your Health');
  });

  it('should take a full page screenshot for visual validation', () => {
    // Capture screenshot manually and save to screenshots directory
    cy.screenshot('homepage-initial-load');
  });
});
