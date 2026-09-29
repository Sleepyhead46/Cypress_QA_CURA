/**
 * Level 2 — Intermediate: 06 Hooks and Test Lifecycle
 * Objective: Demonstrate Mocha hooks (before, beforeEach, afterEach, after)
 * and provide architectural guidance on when to use or avoid each hook.
 *
 * Hook Best Practices:
 * - before(): Runs ONCE before all tests in the block. Ideal for one-time pre-condition setup or database seeding.
 * - beforeEach(): Runs before EVERY test. Ideal for navigating to a fresh page, resetting state, or applying cy.session().
 * - afterEach(): Runs after EVERY test. Ideal for cleanup or reporting custom metadata. Avoid complex resets here; prefer beforeEach.
 * - after(): Runs ONCE after all tests complete. Ideal for teardown or generating summary telemetry.
 */
describe('Intermediate 06: Mocha Lifecycle Hooks', { tags: ['@intermediate', '@lifecycle'] }, () => {
  let suiteStartTime;
  let testExecutionCounter = 0;

  before(() => {
    // One-time suite setup
    suiteStartTime = Date.now();
    cy.log('=== Test Suite Started ===');
  });

  beforeEach(() => {
    // Pre-test setup: Reset browser to clean state and visit login
    testExecutionCounter++;
    cy.log(`--- Running Test #${testExecutionCounter} ---`);
    cy.visit('/profile.php#login');
  });

  afterEach(() => {
    // Post-test hook: Verify test didn't leave application in corrupted visual state
    cy.log(`--- Finished Test #${testExecutionCounter} ---`);
  });

  after(() => {
    // One-time suite teardown
    const suiteDuration = (Date.now() - suiteStartTime) / 1000;
    cy.log(`=== Test Suite Completed. Executed ${testExecutionCounter} tests in ${suiteDuration}s ===`);
  });

  it('runs first test in clean isolated environment', () => {
    cy.get('#txt-username').should('be.visible').and('be.empty');
    cy.get('#txt-password').should('be.visible').and('be.empty');
  });

  it('runs second test without bleed-through from the first test', () => {
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
    cy.get('#btn-login').click();
    cy.get('h2').should('have.text', 'Make Appointment');
  });
});
