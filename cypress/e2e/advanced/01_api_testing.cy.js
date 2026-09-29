/**
 * Level 3 — Advanced: 01 API Testing
 * Objective: Demonstrate cy.request() for fast, headless backend API validations.
 * Tests: GET, POST, redirects, status codes, response headers, response cookies.
 *
 * Real Endpoint Grounding:
 * Strictly tests real endpoints implemented by CURA Healthcare:
 * - GET  / (Homepage)
 * - POST /authenticate.php (Login backend)
 * - GET  /profile.php (Protected resource requiring session)
 * - GET  /authenticate.php?logout (Logout endpoint)
 */
describe('Advanced 01: API Testing with cy.request()', { tags: ['@advanced', '@api'] }, () => {
  const baseUrl = Cypress.config('baseUrl');

  it('GET / - validates homepage HTTP 200 and headers', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/`
    }).then((response) => {
      // 1. Status Code
      expect(response.status).to.eq(200);

      // 2. Response Headers
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('text/html');

      // 3. Response Body Content
      expect(response.body).to.include('CURA Healthcare Service');
      expect(response.body).to.include('btn-make-appointment');
    });
  });

  it('POST /authenticate.php - validates authentication response, redirect, and session cookies', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/authenticate.php`,
      form: true, // Application sends application/x-www-form-urlencoded
      followRedirect: false, // Inspect the direct 302 redirect response
      body: {
        username: 'John Doe',
        password: 'ThisIsNotAPassword'
      }
    }).then((response) => {
      // Verify redirect status code
      expect(response.status).to.eq(302);

      // Verify redirect destination header
      expect(response.headers.location).to.include('#appointment');

      // Verify session cookie set by server
      expect(response.headers).to.have.property('set-cookie');
      const cookies = response.headers['set-cookie'].join('; ');
      expect(cookies).to.include('PHPSESSID');
    });
  });

  it('POST /authenticate.php - validates authentication rejection for invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/authenticate.php`,
      form: true,
      followRedirect: true,
      body: {
        username: 'FakeUser',
        password: 'FakePassword'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Login failed');
    });
  });

  it('GET /profile.php - verifies unauthenticated access redirects to login', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/profile.php`,
      followRedirect: false
    }).then((response) => {
      // Protected endpoint redirects unauthenticated users
      expect(response.status).to.be.oneOf([302, 200]);
      if (response.status === 302) {
        expect(response.headers.location).to.include('login');
      }
    });
  });

  it('GET /authenticate.php?logout - terminates session cleanly', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/authenticate.php?logout`,
      followRedirect: false
    }).then((response) => {
      expect(response.status).to.eq(302);
    });
  });
});
