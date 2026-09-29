/**
 * Level 3 — Advanced: 08 Performance Checks & Timing Metrics
 * Objective: Lightweight front-end timing checks and API duration assertions.
 *
 * Performance Automation Boundaries:
 * Cypress tests single-user interactive browser flows. It is NOT a substitute
 * for high-concurrency stress or load testing tools (e.g., k6, JMeter, Locust, Gatling).
 * Use Cypress performance assertions for SLA thresholds, regression detection,
 * and ensuring core interactions happen within acceptable latency boundaries.
 */
describe('Advanced 08: Client Performance & SLA Timing Checks', { tags: ['@advanced', '@performance'] }, () => {
  it('asserts page load time completes within SLA budget', () => {
    const startTime = Date.now();

    cy.visit('/');

    // Ensure critical interactive elements are visible
    cy.get('#btn-make-appointment')
      .should('be.visible')
      .then(() => {
        const totalDuration = Date.now() - startTime;
        cy.log(`Homepage First Meaningful Paint Duration: ${totalDuration}ms`);
        // SLA threshold: Under 5000ms over public internet
        expect(totalDuration).to.be.lessThan(5000);
      });

    // Inspect Navigation Timing API via window
    cy.window().then((win) => {
      const [navEntry] = win.performance.getEntriesByType('navigation');
      if (navEntry) {
        cy.log(`DOM Interactive: ${Math.round(navEntry.domInteractive)}ms`);
        cy.log(`DOM Complete: ${Math.round(navEntry.domComplete)}ms`);
        expect(navEntry.domInteractive).to.be.greaterThan(0);
      }
    });
  });

  it('measures backend API roundtrip latency within 2500ms SLA', () => {
    const apiStart = Date.now();

    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}/authenticate.php`,
      form: true,
      followRedirect: false,
      body: {
        username: 'John Doe',
        password: 'ThisIsNotAPassword'
      }
    }).then((res) => {
      const duration = Date.now() - apiStart;
      cy.log(`Auth API Latency: ${duration}ms`);
      expect(res.status).to.eq(302);
      expect(duration).to.be.lessThan(2500);
    });
  });
});
