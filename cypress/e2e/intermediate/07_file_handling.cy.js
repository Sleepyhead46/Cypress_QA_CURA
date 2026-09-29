/**
 * Level 2 — Intermediate: 07 File Handling (Upload and Download)
 *
 * Real-world Demo Adaptation Notice:
 * The primary demo site (CURA Healthcare) specializes in patient appointment workflows
 * and intentionally does not include a native document attachment upload or download endpoint.
 * To adhere strictly to Rule #3 ("Do not invent elements, IDs, classes, URLs, APIs, or functionality")
 * and Rule #16 ("If a requested feature is unavailable, explicitly say so and provide the closest valid alternative"),
 * this test demonstrates real Cypress 16+ .selectFile() and file verification using the industry-standard
 * public demo application "The Internet (Herokuapp)" (https://the-internet.herokuapp.com).
 */
describe('Intermediate 07: File Handling Automation', { tags: ['@intermediate', '@files'] }, () => {
  const uploadUrl = 'https://the-internet.herokuapp.com/upload';
  const downloadUrl = 'https://the-internet.herokuapp.com/download';

  it('uploads a file using modern Cypress .selectFile() API', () => {
    cy.visit(uploadUrl);

    // Verify upload container is visible
    cy.get('#file-upload').should('be.visible');

    // Use .selectFile() to attach fixture file
    cy.get('#file-upload').selectFile('cypress/fixtures/sample_report.txt');

    // Submit upload form
    cy.get('#file-submit').click();

    // Verify upload confirmation
    cy.get('h3').should('have.text', 'File Uploaded!');
    cy.get('#uploaded-files').should('contain.text', 'sample_report.txt');
  });

  it('triggers and verifies file download link accessibility', () => {
    cy.visit(downloadUrl);

    // Verify file download list contains at least one downloadable link
    cy.get('.example a').should('have.length.greaterThan', 0);

    // Verify the first available download link has a valid href attribute
    cy.get('.example a')
      .first()
      .should('have.attr', 'href')
      .and('match', /download\/.+/);
  });
});
