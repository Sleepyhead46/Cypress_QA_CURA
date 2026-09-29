# 📋 CURA Healthcare — Cypress Automation Framework: Detailed Documentation

> **Framework Version:** 1.0.0 | **Cypress Version:** 16.1.0 | **Target App:** [CURA Healthcare Service](https://katalon-demo-cura.herokuapp.com)

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Cypress Configuration](#4-cypress-configuration)
5. [Test Tiers — Detailed Breakdown](#5-test-tiers--detailed-breakdown)
   - [Basic Tier (Level 1)](#-basic-tier-level-1--7-spec-files)
   - [Intermediate Tier (Level 2)](#-intermediate-tier-level-2--7-spec-files)
   - [Advanced Tier (Level 3)](#-advanced-tier-level-3--9-spec-files)
6. [Page Object Model (POM)](#6-page-object-model-pom)
7. [Custom Commands](#7-custom-commands)
8. [Test Fixtures & Data](#8-test-fixtures--data)
9. [Support Layer](#9-support-layer)
10. [NPM Scripts Reference](#10-npm-scripts-reference)
11. [Reporting System](#11-reporting-system)
12. [Application Under Test](#12-application-under-test)
13. [Test Tags Reference](#13-test-tags-reference)
14. [Best Practices Applied](#14-best-practices-applied)

---

## 1. Project Overview

This is a **production-grade, tiered End-to-End (E2E) automation framework** built entirely with Cypress 16. It tests the **CURA Healthcare Service** — a publicly available demo healthcare appointment booking web application.

The framework is deliberately designed in **three progressive learning tiers**:

| Tier | Level | Purpose |
|------|-------|---------|
| `basic/` | Beginner | Core Cypress commands and DOM interactions |
| `intermediate/` | Mid-level | Patterns: POM, fixtures, custom commands, data-driven |
| `advanced/` | Expert | API testing, network interception, accessibility, performance |

**Total test spec files: 23** (7 Basic + 7 Intermediate + 9 Advanced)

---

## 2. Technology Stack

| Technology | Version | Role |
|------------|---------|------|
| **Cypress** | `^16.1.0` | Core E2E testing engine |
| **cypress-axe** | `^1.7.0` | Accessibility (a11y) testing integration |
| **axe-core** | `^4.13.0` | WCAG rules engine powering `cypress-axe` |
| **mochawesome** | `^8.1.1` | Per-spec JSON test reporter |
| **mochawesome-merge** | `^5.1.1` | Merges multiple JSON reports into one |
| **mochawesome-report-generator** | `^6.3.2` | Generates final HTML report from merged JSON |
| **Node.js / CommonJS** | `"type": "commonjs"` | Module system for config files |

---

## 3. Project Structure

```
cypress_1/
│
├── cypress.config.js              # Global Cypress configuration & reporter setup
├── package.json                   # Scripts, dependencies, metadata
├── .gitignore                     # Ignored files (node_modules, reports, etc.)
├── detaile.md                     # This file — detailed project documentation
│
└── cypress/
    ├── e2e/                       # All test specifications (23 total)
    │   ├── basic/                 # Level 1 — 7 foundational spec files
    │   │   ├── 01_visit_and_headings.cy.js
    │   │   ├── 02_element_validation.cy.js
    │   │   ├── 03_text_inputs.cy.js
    │   │   ├── 04_button_click.cy.js
    │   │   ├── 05_dropdown.cy.js
    │   │   ├── 06_checkbox_radio.cy.js
    │   │   └── 07_navigation.cy.js
    │   │
    │   ├── intermediate/          # Level 2 — 7 pattern-based spec files
    │   │   ├── 01_fixtures.cy.js
    │   │   ├── 02_custom_commands.cy.js
    │   │   ├── 03_page_objects.cy.js
    │   │   ├── 04_data_driven.cy.js
    │   │   ├── 05_assertions_deep_dive.cy.js
    │   │   ├── 06_hooks_lifecycle.cy.js
    │   │   └── 07_file_handling.cy.js
    │   │
    │   └── advanced/              # Level 3 — 9 expert-level spec files
    │       ├── 01_api_testing.cy.js
    │       ├── 02_network_interception.cy.js
    │       ├── 03_auth_session.cy.js
    │       ├── 04_dynamic_elements.cy.js
    │       ├── 05_tables_and_panels.cy.js
    │       ├── 06_negative_and_edge_cases.cy.js
    │       ├── 07_accessibility.cy.js
    │       ├── 08_performance_checks.cy.js
    │       └── 09_error_handling_debugging.cy.js
    │
    ├── pages/                     # Page Object Model (POM) classes
    │   ├── LoginPage.js           # Login form interactions
    │   ├── AppointmentPage.js     # Appointment booking form
    │   ├── SummaryPage.js         # Confirmation summary page
    │   ├── HistoryPage.js         # Appointment history page
    │   └── Navbar.js              # Sidebar navigation component
    │
    ├── fixtures/                  # Static test data (JSON)
    │   ├── users.json             # Valid, invalid, edge-case user credentials
    │   ├── appointments.json      # Appointment booking scenarios
    │   ├── testData.json          # Page text, endpoints, form options
    │   ├── example.json           # Cypress default example fixture
    │   └── sample_report.txt      # Sample text file for file-handling tests
    │
    ├── support/                   # Global setup and custom extensions
    │   ├── e2e.js                 # Entry point — imports commands & cypress-axe
    │   ├── commands.js            # 6 custom Cypress commands
    │   ├── component.js           # Component testing support file
    │   └── component-index.html   # Component testing HTML mount point
    │
    ├── reports/                   # Generated test reports (git-ignored)
    │   └── mocha/                 # Per-spec JSON output from mochawesome
    │
    └── screenshots/               # Auto-captured on test failure (git-ignored)
```

---

## 4. Cypress Configuration

**File:** [`cypress.config.js`](./cypress.config.js)

### Core Settings

```js
baseUrl:               'https://katalon-demo-cura.herokuapp.com'
specPattern:           'cypress/e2e/**/*.cy.js'
supportFile:           'cypress/support/e2e.js'
viewportWidth:         1280
viewportHeight:        800
defaultCommandTimeout: 8000   // ms — wait for DOM commands
pageLoadTimeout:       30000  // ms — wait for page to load
requestTimeout:        10000  // ms — wait for cy.request() to send
responseTimeout:       15000  // ms — wait for server response
screenshotOnRunFailure: true
chromeWebSecurity:     false  // allows cross-origin requests in tests
video:                 false  // video recording disabled (saves CI storage)
```

### Retry Strategy

```js
retries: {
  runMode: 1,   // 1 automatic retry on failure in CI (cypress run)
  openMode: 0   // No retries in interactive mode (cypress open)
}
```

### Environment Variables (set via `setupNodeEvents`)

| Variable | Value | Purpose |
|----------|-------|---------|
| `demoSite` | `"CURA Healthcare Service"` | Accessible in tests via `Cypress.env('demoSite')` |
| `secondaryDemoUrl` | `"https://the-internet.herokuapp.com"` | Secondary test site for supplemental scenarios |

### Reporter Configuration

```js
reporter: 'mochawesome'
reporterOptions:
  reportDir:  'cypress/reports/mocha'
  overwrite:  false            // each run appends timestamped files
  html:       false            // raw JSON only (HTML generated separately)
  json:       true
  timestamp:  'mmddyyyy_HHMMss'
```

---

## 5. Test Tiers — Detailed Breakdown

---

### 🟢 Basic Tier (Level 1) — 7 Spec Files

> **Goal:** Teach the foundational Cypress API through real page interactions on the CURA homepage, login, and appointment pages.

---

#### `01_visit_and_headings.cy.js`
**Tags:** `@smoke`, `@basic`

Covers the very first steps of automation — opening a page and checking what's on it.

| Test | What It Does |
|------|-------------|
| URL validation | `cy.url().should('eq', baseUrl + '/')` confirms the browser landed on the correct page |
| Page title | `cy.title().should('eq', 'CURA Healthcare Service')` reads the browser tab title |
| Main heading | `cy.get('header#top h1')` — asserts the hero heading text is visible and correct |
| Sub-heading | `cy.get('header#top h3')` — asserts the tagline "We Care About Your Health" |
| Screenshot | `cy.screenshot('homepage-initial-load')` — captures a named screenshot for visual records |

**Key Concepts:** `cy.visit()`, `cy.url()`, `cy.title()`, `cy.get()`, `.should()`, `cy.screenshot()`

---

#### `02_element_validation.cy.js`
**Tags:** `@basic`

Deep-dives into DOM element state assertions — the backbone of all test verifications.

| Test | What It Does |
|------|-------------|
| Visibility checks | Asserts the CTA button, navbar toggle, and footer are visible |
| Existence checks | `.should('exist')` vs `.should('not.exist')` |
| Attribute checks | `.should('have.attr', 'href', ...)` on anchor links |
| CSS class checks | `.should('have.class', ...)` on layout containers |
| Count assertions | `.should('have.length', N)` on lists of elements |

**Key Concepts:** `be.visible`, `exist`, `have.attr`, `have.class`, `have.length`

---

#### `03_text_inputs.cy.js`
**Tags:** `@basic`

Tests interaction with text input fields on the login page.

| Test | What It Does |
|------|-------------|
| Type into field | `.type('John Doe')` enters text into the username input |
| Clear field | `.clear()` empties an input |
| Read value | `.should('have.value', '...')` verifies the typed content |
| Secure typing | `.type(password, { log: false })` hides password from Cypress logs |
| Placeholder text | `.should('have.attr', 'placeholder', '...')` checks hint text |

**Key Concepts:** `cy.type()`, `cy.clear()`, `have.value`, `{ log: false }`

---

#### `04_button_click.cy.js`
**Tags:** `@basic`

Tests button interactions and the resulting page state changes.

| Test | What It Does |
|------|-------------|
| CTA button click | Clicks "Make Appointment" → verifies redirect to login |
| Login button | Clicks after filling credentials → verifies redirect to appointment form |
| Sidebar toggle | Clicks hamburger → verifies sidebar opens (`have.class 'active'`) |

**Key Concepts:** `cy.click()`, chaining assertions after user actions

---

#### `05_dropdown.cy.js`
**Tags:** `@basic`

Tests the facility `<select>` dropdown on the appointment form.

| Test | What It Does |
|------|-------------|
| Select by visible text | `.select('Tokyo CURA Healthcare Center')` |
| Select by index | `.select(1)` selects the second option |
| Verify selection | `.should('have.value', '...')` confirms selected option |
| All options present | Loops over expected options and asserts each exists |

**Key Concepts:** `cy.select()`, `have.value`, iterating `<option>` elements

---

#### `06_checkbox_radio.cy.js`
**Tags:** `@basic`

Tests checkbox and radio button interactions on the appointment form.

| Test | What It Does |
|------|-------------|
| Check a checkbox | `.check()` on hospital readmission checkbox |
| Uncheck a checkbox | `.uncheck()` and assert `not.be.checked` |
| Select radio button | `.check()` on Medicare / Medicaid / None radios |
| Verify checked state | `.should('be.checked')` |
| Verify unchecked state | `.should('not.be.checked')` |

**Key Concepts:** `cy.check()`, `cy.uncheck()`, `be.checked`, radio group selection

---

#### `07_navigation.cy.js`
**Tags:** `@basic`

Tests all navigation paths through the sidebar menu.

| Test | What It Does |
|------|-------------|
| Home link | Opens sidebar → clicks Home → verifies homepage URL |
| Login link | Navigates to login page via sidebar |
| History link | Navigates to history page (authenticated) |
| Logout | Clicks Logout → verifies return to homepage |
| URL assertions | `cy.url().should('include', '/...')` after each navigation |

**Key Concepts:** Sidebar interaction pattern, `cy.url()`, sequential navigation

---

### 🟡 Intermediate Tier (Level 2) — 7 Spec Files

> **Goal:** Introduce professional testing patterns — fixtures, custom commands, Page Objects, data-driven loops, and lifecycle hooks.

---

#### `01_fixtures.cy.js`
**Tags:** `@intermediate`

Demonstrates externalizing test data into JSON fixture files.

```js
// Loading a fixture
cy.fixture('users').then((users) => {
  cy.login(users.validUser.username, users.validUser.password);
});
```

| Test | What It Does |
|------|-------------|
| Load `users.json` | Reads valid user data and uses it for login |
| Load `testData.json` | Asserts page text against fixture values |
| Load `appointments.json` | Uses appointment data to fill the booking form |
| Fixture aliasing | `cy.fixture('...').as('alias')` for use across multiple `it` blocks |

**Key Concepts:** `cy.fixture()`, `.as()`, fixture aliasing, externalizing test data

---

#### `02_custom_commands.cy.js`
**Tags:** `@intermediate`

Shows the power of reusable custom commands defined in `commands.js`.

| Test | What It Does |
|------|-------------|
| `cy.login()` | Single call to log in — abstracts username/password/submit |
| `cy.bookAppointment({})` | Books an appointment with overridable defaults |
| `cy.verifyAppointmentSummary({})` | Verifies the entire confirmation page |
| `cy.openSidebar()` / `cy.closeSidebar()` | Sidebar control abstractions |
| `cy.navigateViaSidebar('History')` | Opens sidebar and clicks the given link |
| `cy.logout()` | Full logout flow verification |

**Key Concepts:** `Cypress.Commands.add()`, command chaining, default parameters

---

#### `03_page_objects.cy.js`
**Tags:** `@intermediate`, `@smoke`

Demonstrates the Page Object Model (POM) pattern with all 5 page classes.

```js
import LoginPage from '../../pages/LoginPage';
import AppointmentPage from '../../pages/AppointmentPage';
import SummaryPage from '../../pages/SummaryPage';

LoginPage.visit().fillUsername('John Doe').fillPassword('ThisIsNotAPassword').clickLogin();
AppointmentPage.bookAppointment({ facility: 'Tokyo CURA Healthcare Center' });
SummaryPage.verifySummary({ facility: 'Tokyo CURA Healthcare Center' });
```

| Test | What It Does |
|------|-------------|
| End-to-end booking flow | Login → Book → Verify Summary — all via POM |
| Login page elements | Verifies heading, subheading, demo account info box |
| Appointment page | Exercises all form fields through POM methods |
| Summary page | Asserts all 5 confirmation fields via `SummaryPage.verifySummary()` |
| History page | `HistoryPage.verifyHasAppointments()` after booking |

**Key Concepts:** `import/export`, ES6 class instances, method chaining on POM, selector encapsulation

---

#### `04_data_driven.cy.js`
**Tags:** `@intermediate`

Runs the same test logic multiple times with different data using `forEach` loops.

```js
cy.fixture('users').then(({ dataDrivenUsers }) => {
  dataDrivenUsers.forEach(({ description, username, password, shouldSucceed }) => {
    it(description, () => {
      cy.login(username, password);
      if (shouldSucceed) {
        cy.url().should('include', '#appointment');
      } else {
        cy.get('.text-danger').should('be.visible');
      }
    });
  });
});
```

Fixture data drives 4 login scenarios:
1. Invalid username + valid password → should fail
2. Valid username + invalid password → should fail
3. SQL injection pattern → should fail (security boundary)
4. Valid demo credentials → should succeed

**Key Concepts:** Data-driven testing, `forEach` dynamic test generation, conditional assertions

---

#### `05_assertions_deep_dive.cy.js`
**Tags:** `@intermediate`

A showcase of all major assertion styles available in Cypress.

| Assertion Style | Example |
|----------------|---------|
| **BDD** (Chai) | `.should('have.text', 'Login')` |
| **TDD** (assert) | `assert.isTrue(element.visible)` |
| **jQuery** | `.should('be.visible').and('have.class', 'btn')` |
| **Negative** | `.should('not.exist')`, `.should('not.be.checked')` |
| **Chained** | `.should('be.visible').and('have.attr', 'id', 'btn-login')` |
| **Custom** | `.should((el) => { expect(el.text()).to.include('...') })` |

**Key Concepts:** `expect()`, `assert.*`, `.and()`, chained assertions, custom assertion callbacks

---

#### `06_hooks_lifecycle.cy.js`
**Tags:** `@intermediate`

Teaches Cypress test lifecycle hooks for setup and teardown.

```js
describe('Hooks Demo', () => {
  before(() => { /* runs ONCE before all tests in this block */ });
  beforeEach(() => { /* runs before EACH test — login, navigate */ });
  afterEach(() => { /* runs after EACH test — cleanup screenshot */ });
  after(() => { /* runs ONCE after all tests — final logout */ });
});
```

| Hook | When It Runs | Typical Use |
|------|-------------|-------------|
| `before()` | Once, before all `it` blocks | DB seed, one-time auth setup |
| `beforeEach()` | Before every `it` block | Login, navigate to starting page |
| `afterEach()` | After every `it` block | Log state, take screenshot on failure |
| `after()` | Once, after all `it` blocks | Logout, cleanup, data teardown |

**Key Concepts:** Hook execution order, shared state between hooks, nested `describe` hooks

---

#### `07_file_handling.cy.js`
**Tags:** `@intermediate`

Exercises Cypress file system task commands.

| Test | What It Does |
|------|-------------|
| `cy.readFile()` | Reads `sample_report.txt` from fixtures and asserts content |
| `cy.writeFile()` | Writes JSON test results to `cypress/reports/test-output.json` |
| Read-after-write | Reads back written file and asserts data integrity |
| Fixture txt file | Reads and verifies plain text fixture content |

**Key Concepts:** `cy.readFile()`, `cy.writeFile()`, file path handling, JSON serialization

---

### 🔴 Advanced Tier (Level 3) — 9 Spec Files

> **Goal:** Expert-level automation patterns covering API testing, network interception, authentication sessions, accessibility, performance, and edge-case handling.

---

#### `01_api_testing.cy.js`
**Tags:** `@advanced`, `@api`

Exercises Cypress's built-in HTTP client (`cy.request()`) against real CURA backend endpoints — bypassing the browser UI entirely for speed.

**Tested Endpoints:**

| Method | Endpoint | Test |
|--------|----------|------|
| `GET` | `/` | Returns HTTP 200, `text/html` content-type, includes app name in body |
| `POST` | `/authenticate.php` | Valid credentials → HTTP 302 redirect to `#appointment`, sets `PHPSESSID` cookie |
| `POST` | `/authenticate.php` | Invalid credentials → HTTP 200 with "Login failed" in body |
| `GET` | `/profile.php` | Unauthenticated → redirects to login (302 or 200) |
| `GET` | `/authenticate.php?logout` | Terminates session → 302 redirect |

```js
cy.request({
  method: 'POST',
  url: `${baseUrl}/authenticate.php`,
  form: true,               // sends application/x-www-form-urlencoded
  followRedirect: false,    // inspect the raw 302 before redirect
  body: { username: 'John Doe', password: 'ThisIsNotAPassword' }
}).then((response) => {
  expect(response.status).to.eq(302);
  expect(response.headers.location).to.include('#appointment');
  expect(response.headers['set-cookie'].join('; ')).to.include('PHPSESSID');
});
```

**Key Concepts:** `cy.request()`, `form: true`, `followRedirect: false`, status codes, response headers, cookies

---

#### `02_network_interception.cy.js`
**Tags:** `@advanced`

Uses `cy.intercept()` to spy on and stub real network requests during UI test flows.

| Test | What It Does |
|------|-------------|
| Spy on authenticate | Intercepts `POST /authenticate.php`, asserts request body and response status |
| Stub network response | Returns a custom JSON body to simulate backend state |
| Wait for request | `cy.wait('@aliasName')` pauses until the intercepted request completes |
| Assert request payload | Inspects what the app sends to the server |
| Verify no extra calls | Ensures the app does not make unexpected API requests |

```js
cy.intercept('POST', '/authenticate.php').as('loginRequest');
cy.login('John Doe', 'ThisIsNotAPassword');
cy.wait('@loginRequest').then((interception) => {
  expect(interception.response.statusCode).to.eq(302);
});
```

**Key Concepts:** `cy.intercept()`, `.as()` aliasing, `cy.wait('@alias')`, request/response spying

---

#### `03_auth_session.cy.js`
**Tags:** `@advanced`

Tests session management, cookie persistence, and authenticated navigation flows.

| Test | What It Does |
|------|-------------|
| Cookie set on login | Verifies `PHPSESSID` cookie is present after authentication |
| Session persistence | Navigates to multiple authenticated pages without re-logging in |
| Session expiry simulation | Clears cookies → navigates protected route → verifies redirect to login |
| `cy.session()` usage | Caches auth state across tests to avoid repeated logins |
| Protected page guards | Asserts unauthenticated access is denied |

**Key Concepts:** `cy.getCookie()`, `cy.clearCookies()`, `cy.session()`, session caching, auth state management

---

#### `04_dynamic_elements.cy.js`
**Tags:** `@advanced`

Handles elements that appear, change, or load asynchronously.

| Test | What It Does |
|------|-------------|
| Retry-ability | Uses Cypress's built-in retry against elements that render after JS execution |
| Conditional existence | `if ($el.length)` — acts differently based on element presence |
| Waiting strategies | `cy.wait()` vs `.should()` vs `cy.intercept()` — choosing the right approach |
| Bootstrap datepicker | Interacts with the calendar popup — types date, dismisses picker |
| Loader/spinner | Waits for loading indicators to disappear before interacting |

**Key Concepts:** Cypress retry-ability, `cy.get().should()` as polling, conditional actions, dynamic content timing

---

#### `05_tables_and_panels.cy.js`
**Tags:** `@advanced`

Navigates and validates tabular and accordion/panel data structures.

| Test | What It Does |
|------|-------------|
| History table panels | Counts `.panel.panel-info` elements after booking |
| Panel data validation | Uses `.within()` to scope assertions inside a specific panel |
| Specific row lookup | `cy.contains()` to find a panel with matching facility name |
| Field-by-field assertion | Checks `#facility`, `#program`, `#visit_date`, `#comment` per panel |
| No appointments state | Verifies the "No appointment." message when history is empty |

```js
HistoryPage.appointmentPanels.eq(0).within(() => {
  cy.get('#facility').should('have.text', 'Tokyo CURA Healthcare Center');
  cy.get('#program').should('have.text', 'Medicare');
});
```

**Key Concepts:** `.within()`, `.eq(index)`, panel-scoped assertions, `cy.contains()`

---

#### `06_negative_and_edge_cases.cy.js`
**Tags:** `@advanced`

Deliberately tests failure paths, security boundaries, and edge conditions.

| Test | What It Does |
|------|-------------|
| Empty form submission | Submits login with no values → asserts error message |
| Wrong password | Valid user + wrong password → "Login failed" message |
| Empty password | Valid user + blank password → error |
| SQL injection | `' OR '1'='1` pattern → verifies the app rejects it |
| XSS-like input | Special characters in comment field — verifies safe handling |
| Whitespace-only input | Spaces in username field → login rejection |
| Very long strings | Extremely long input strings in form fields |
| Special characters | Non-ASCII chars in form fields |

**Key Concepts:** Negative testing, boundary conditions, security input testing, error state assertions

---

#### `07_accessibility.cy.js`
**Tags:** `@advanced`, `@a11y`

Automates WCAG accessibility audits using `cypress-axe` powered by `axe-core`.

```js
cy.visit('/');
cy.injectAxe();                // injects axe-core into the page DOM
cy.checkA11y(
  null,                        // scope: null = entire page
  { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } },
  (violations) => {
    violations.forEach(v => cy.log(`[${v.impact.toUpperCase()}] ${v.id}: ${v.help}`));
  },
  true                         // skipFailures: true — logs without failing test
);
```

| Test | What It Checks |
|------|---------------|
| Homepage scan | Full WCAG 2.1 AA audit of homepage |
| Login form scan | Scopes audit to `#login form` element |
| Heading structure | `h1` and `h3` exist with at least 1 each |
| Label associations | `label[for="txt-username"]` explicitly linked to input |
| Button naming | `#btn-login` has visible, accessible text |

> **Note:** Automated scanners catch ~30–57% of WCAG defects. Manual screen reader testing (NVDA, JAWS, VoiceOver) is always required to complement automated audits.

**Key Concepts:** `cy.injectAxe()`, `cy.checkA11y()`, WCAG tags, `skipFailures`, violation logging

---

#### `08_performance_checks.cy.js`
**Tags:** `@advanced`

Measures and asserts page load timing metrics from the browser's Performance API.

```js
cy.window().then((win) => {
  const perf = win.performance.timing;
  const loadTime = perf.loadEventEnd - perf.navigationStart;
  expect(loadTime).to.be.lessThan(5000); // page must load in < 5s
});
```

| Test | What It Checks |
|------|---------------|
| Homepage load time | `loadEventEnd - navigationStart` < 5000ms |
| DOM interactive time | `domInteractive - navigationStart` |
| TTFB (Time to First Byte) | `responseStart - navigationStart` |
| Login page load | Consistent load budget on the login route |
| Appointment page | Load performance after authentication |

**Key Concepts:** `window.performance.timing`, performance budgets, `cy.window()`, navigation timing API

---

#### `09_error_handling_debugging.cy.js`
**Tags:** `@advanced`

Tests graceful error handling, uncaught exception suppression, and debugging strategies.

| Test | What It Does |
|------|-------------|
| Uncaught exception suppression | `Cypress.on('uncaught:exception', () => false)` prevents 3rd-party JS errors from failing tests |
| Network failure handling | Simulates offline state and asserts the UI handles it gracefully |
| `cy.on('fail', handler)` | Custom failure handler — logs context before test fails |
| Debug screenshot | `cy.screenshot()` on error conditions for post-mortem analysis |
| Wrapped assertions | `try/catch` patterns for optional element assertions |
| Custom error messages | `.should('exist', 'Custom message if assertion fails')` |

**Key Concepts:** `Cypress.on('uncaught:exception')`, `cy.on('fail')`, defensive test patterns, debugging hooks

---

## 6. Page Object Model (POM)

All 5 POM classes live in `cypress/pages/` and are exported as **singleton instances** (`export default new ClassName()`). This means every `import` gets the same object, preventing state issues.

Each class follows this pattern:
1. **Getters** — return `cy.get(selector)` (lazily evaluated, always fresh)
2. **Action methods** — perform UI interactions, return `this` for method chaining
3. **Verification methods** — combine multiple assertions into one readable call

---

### `LoginPage.js`

```js
class LoginPage {
  get usernameInput() { return cy.get('#txt-username'); }
  get passwordInput() { return cy.get('#txt-password'); }
  get loginButton()   { return cy.get('#btn-login'); }
  get errorMessage()  { return cy.get('.text-danger'); }

  visit()                    { cy.visit('/profile.php#login'); return this; }
  fillUsername(username)     { this.usernameInput.clear().type(username); return this; }
  fillPassword(password)     { this.passwordInput.clear().type(password, { log: false }); return this; }
  clickLogin()               { this.loginButton.click(); return this; }
  login(username, password)  { this.fillUsername(username).fillPassword(password).clickLogin(); }
}
export default new LoginPage();
```

---

### `AppointmentPage.js`

Manages the 5-field appointment booking form:

| Method | Form Element | Selector |
|--------|-------------|----------|
| `selectFacility(name)` | Facility dropdown | `#combo_facility` |
| `setHospitalReadmission(bool)` | Readmission checkbox | `#chk_hospotal_readmission` |
| `selectProgram('Medicare'/'Medicaid'/'None')` | Program radio group | `#radio_program_*` |
| `setVisitDate('dd/mm/yyyy')` | Visit date input | `#txt_visit_date` |
| `setComment(text)` | Comment textarea | `#txt_comment` |
| `clickBookAppointment()` | Submit button | `#btn-book-appointment` |
| `bookAppointment({...})` | All fields at once | (composite method) |

---

### `SummaryPage.js`

Reads and verifies the confirmation page after booking:

| Getter | Verifies | Selector |
|--------|----------|----------|
| `facility` | Booked facility name | `#facility` |
| `hospitalReadmission` | "Yes" or "No" | `#hospital_readmission` |
| `program` | Insurance program | `#program` |
| `visitDate` | Appointment date | `#visit_date` |
| `comment` | Patient notes | `#comment` |
| `verifySummary({...})` | All fields at once | (composite assertion) |

---

### `HistoryPage.js`

Reads the appointment history page:

| Getter / Method | Purpose |
|----------------|---------|
| `appointmentPanels` | All `.panel.panel-info` elements on the page |
| `noAppointmentText` | "No appointment." paragraph when history is empty |
| `verifyHasAppointments()` | Asserts at least 1 panel exists |
| `verifyAppointmentAt(index, {...})` | Scopes assertions to the Nth panel |
| `goToHomepage()` | Clicks "Go to Homepage" link |

---

### `Navbar.js`

Controls the sliding sidebar navigation menu:

| Getter / Method | Selector / Action |
|----------------|-----------------|
| `menuToggle` | `#menu-toggle` — hamburger icon |
| `menuClose` | `#menu-close` — close button inside sidebar |
| `sidebarWrapper` | `#sidebar-wrapper` — the sidebar container |
| `homeLink` | Sidebar "Home" link |
| `historyLink` | Sidebar "History" link |
| `profileLink` | Sidebar "Profile" link |
| `logoutLink` | Sidebar "Logout" link |
| `open()` | Clicks toggle, asserts `active` class |
| `close()` | Clicks close, asserts no `active` class |
| `navigateTo(name)` | Opens sidebar, clicks the named link |

---

## 7. Custom Commands

**File:** [`cypress/support/commands.js`](./cypress/support/commands.js)

Six global commands registered via `Cypress.Commands.add()` — available in every test without imports.

---

### `cy.login(username, password)`

```js
cy.login();                                     // uses defaults
cy.login('John Doe', 'ThisIsNotAPassword');     // explicit
```

- Visits `/profile.php#login`
- Clears and types username
- Clears and types password (`{ log: false }` for security)
- Clicks `#btn-login`

**Default:** `username = 'John Doe'`, `password = 'ThisIsNotAPassword'`

---

### `cy.bookAppointment(options)`

```js
cy.bookAppointment({
  facility: 'Tokyo CURA Healthcare Center',
  hospitalReadmission: true,
  program: 'Medicare',
  visitDate: '15/10/2026',
  comment: 'Test comment'
});
```

All parameters are optional — defaults are applied for any omitted fields.

| Option | Default |
|--------|---------|
| `facility` | `'Tokyo CURA Healthcare Center'` |
| `hospitalReadmission` | `false` |
| `program` | `'Medicare'` |
| `visitDate` | `'15/10/2026'` |
| `comment` | `'Automated appointment test'` |

---

### `cy.verifyAppointmentSummary(expected)`

```js
cy.verifyAppointmentSummary({
  facility: 'Tokyo CURA Healthcare Center',
  hospitalReadmission: true,
  program: 'Medicare',
  visitDate: '15/10/2026',
  comment: 'Test comment'
});
```

Asserts URL includes `#summary`, heading is "Appointment Confirmation", and all provided fields match their DOM values. Any field can be omitted — only provided fields are asserted.

---

### `cy.openSidebar()`

- Clicks `#menu-toggle`
- Asserts `#sidebar-wrapper` has class `active`

---

### `cy.closeSidebar()`

- Clicks `#menu-close`
- Asserts `#sidebar-wrapper` does NOT have class `active`

---

### `cy.navigateViaSidebar(linkText)`

```js
cy.navigateViaSidebar('History');
cy.navigateViaSidebar('Logout');
```

- Calls `cy.openSidebar()`
- Finds and clicks anchor matching `linkText` inside the sidebar

---

### `cy.logout()`

- Calls `cy.navigateViaSidebar('Logout')`
- Asserts URL returns to `baseUrl + '/'`
- Asserts "Make Appointment" CTA button is visible

---

## 8. Test Fixtures & Data

**Directory:** `cypress/fixtures/`

---

### `users.json`

Provides structured credential datasets for login tests.

| Key | Purpose |
|-----|---------|
| `validUser` | Standard demo credentials that successfully log in |
| `invalidUser` | Wrong credentials — expects "Login failed" error |
| `emptyUsername` | Blank username with valid password — expects error |
| `emptyPassword` | Valid username with blank password — expects error |
| `dataDrivenUsers[]` | Array of 4 login scenarios for data-driven iteration |

The `dataDrivenUsers` array includes a **SQL injection pattern** (`' OR '1'='1`) to verify the application rejects security attack inputs.

---

### `appointments.json`

Provides appointment booking datasets.

| Key | Contents |
|-----|---------|
| `singleAppointment` | One complete appointment for Tokyo facility, Medicaid, with readmission |
| `appointmentsList[]` | 3 appointments across Tokyo, Hongkong, and Seoul facilities |

---

### `testData.json`

Centralizes page text and endpoint paths to avoid hardcoding strings in tests.

| Key Path | Value |
|---------|-------|
| `site.title` | `"CURA Healthcare Service"` |
| `site.mainHeading` | `"CURA Healthcare Service"` |
| `loginPage.invalidLoginMessage` | `"Login failed! Please ensure..."` |
| `appointmentForm.facilities` | Array of 3 facility names |
| `appointmentForm.programs` | `["Medicare", "Medicaid", "None"]` |
| `endpoints.authenticate` | `"/authenticate.php"` |
| `endpoints.appointment` | `"/appointment.php#summary"` |
| `endpoints.history` | `"/history.php#history"` |

---

## 9. Support Layer

**Directory:** `cypress/support/`

---

### `e2e.js` — Global Entry Point

Auto-loaded before every test file. Responsibilities:

```js
import './commands';     // registers all 6 custom commands globally
import 'cypress-axe';   // registers cy.injectAxe() and cy.checkA11y()

// Prevents 3rd-party JS errors (Bootstrap, analytics) from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // returning false stops Cypress from failing the test
});
```

---

### `commands.js` — Custom Command Definitions

Contains all 6 custom commands. Each is documented with JSDoc:
- Parameter types and descriptions
- Default values
- DOM interactions performed
- Assertions made

---

### `component.js` & `component-index.html`

Scaffold files for Cypress Component Testing (CT). Not used in this E2E-focused project but included if component tests are added in the future.

---

## 10. NPM Scripts Reference

**File:** [`package.json`](./package.json)

### Running Tests

| Script | Command | Description |
|--------|---------|-------------|
| `npm run cy:open` | `cypress open` | Launch interactive Cypress Test Runner UI |
| `npm run cy:run` | `cypress run` | Run all tests headlessly (default browser) |
| `npm run cy:run:chrome` | `cypress run --browser chrome` | Run in Chrome |
| `npm run cy:run:edge` | `cypress run --browser edge` | Run in Microsoft Edge |
| `npm run cy:run:electron` | `cypress run --browser electron` | Run in Electron (built-in) |
| `npm run cy:run:headless` | `cypress run --headless` | Explicitly headless mode |

### Filtered Test Runs

| Script | Spec Pattern | Purpose |
|--------|-------------|---------|
| `npm run test:basic` | `cypress/e2e/basic/**/*.cy.js` | Run only 7 basic specs |
| `npm run test:intermediate` | `cypress/e2e/intermediate/**/*.cy.js` | Run only 7 intermediate specs |
| `npm run test:advanced` | `cypress/e2e/advanced/**/*.cy.js` | Run only 9 advanced specs |
| `npm run test:smoke` | `01_visit_and_headings` + `03_page_objects` | Critical path smoke suite |
| `npm run test:regression` | `cypress/e2e/**/*.cy.js` | Full regression — all 23 specs |
| `npm run test:api` | `advanced/01_api_testing.cy.js` | API tests only |
| `npm run test:ui` | `basic/**` + `intermediate/**` | All UI tests (14 specs) |

### Reporting

| Script | Description |
|--------|-------------|
| `npm run report:merge` | Merge all per-spec JSON files into `merged-report.json` |
| `npm run report:generate` | Convert merged JSON into HTML report with charts |
| `npm run report` | Full report pipeline (merge + generate) |

### Full Pipeline

| Script | Steps | Description |
|--------|-------|-------------|
| `npm run clean:reports` | Node inline script | Deletes `reports/`, `screenshots/`, `videos/` |
| `npm run pretest` | Runs `clean:reports` | Auto-runs before `npm test` |
| `npm run test` | `cypress run \|\| true` | Run all (never fails pipeline on test failure) |
| `npm run test:full` | clean → test → report | Complete CI pipeline |

---

## 11. Reporting System

The framework uses a **3-step Mochawesome pipeline** to produce a single, polished HTML test report.

```
Step 1: Run tests
  └── Each spec file produces one timestamped JSON in cypress/reports/mocha/
        e.g., 01_visit_and_headings_09292026_104235.json

Step 2: Merge (npm run report:merge)
  └── mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/merged-report.json

Step 3: Generate HTML (npm run report:generate)
  └── marge merged-report.json -f report -o cypress/reports/html --charts true
        Produces: cypress/reports/html/report.html
```

### Report Features

- Pass/fail status per test with color indicators
- Visual pie charts of pass/fail ratios
- Duration per test and suite
- Embedded failure screenshots
- Expandable test body and error stack traces
- Timestamp on each individual JSON report file

---

## 12. Application Under Test

**URL:** `https://katalon-demo-cura.herokuapp.com`  
**Name:** CURA Healthcare Service

### Pages & Routes

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Landing page with "Make Appointment" CTA |
| Login | `/profile.php#login` | Username/password login form |
| Make Appointment | `/appointment.php#appointment` | 5-field booking form (post-login) |
| Appointment Summary | `/appointment.php#summary` | Confirmation page after booking |
| History | `/history.php#history` | List of all booked appointments |
| Profile | `/profile.php#profile` | User profile (authenticated) |

### Authentication Credentials

| Field | Value |
|-------|-------|
| Username | `John Doe` |
| Password | `ThisIsNotAPassword` |

### Appointment Form Fields

| Field | Type | Options |
|-------|------|---------|
| Facility | `<select>` dropdown | Tokyo, Hongkong, Seoul CURA Healthcare Center |
| Hospital Readmission | Checkbox | Checked / Unchecked |
| Healthcare Program | Radio Group | Medicare, Medicaid, None |
| Visit Date | Text Input | `dd/mm/yyyy` format |
| Comment | Textarea | Free text |

---

## 13. Test Tags Reference

Tags are defined in `describe()` block metadata.

| Tag | Applied To | Purpose |
|-----|-----------|---------|
| `@basic` | All basic tier specs | Filter basic tests only |
| `@intermediate` | All intermediate specs | Filter intermediate tests |
| `@advanced` | All advanced specs | Filter advanced tests |
| `@smoke` | `01_visit_and_headings`, `03_page_objects` | Critical path fast check |
| `@api` | `01_api_testing` | API-only test run |
| `@a11y` | `07_accessibility` | Accessibility audit run |

---

## 14. Best Practices Applied

| Practice | Implementation |
|----------|---------------|
| **Page Object Model** | 5 POM classes encapsulate all selectors in `cypress/pages/` |
| **Custom Commands** | 6 reusable commands prevent duplication across 23 specs |
| **Fixture-Based Data** | All test data externalized into 3 JSON fixture files |
| **No hardcoded waits** | Zero `cy.wait(ms)` — uses retry-ability and `cy.intercept()` aliases |
| **Secure logging** | `{ log: false }` on all `.type(password)` calls |
| **Failure screenshots** | `screenshotOnRunFailure: true` captures every failure automatically |
| **Retry on failure** | `runMode: 1` automatically retries flaky tests once in CI |
| **Uncaught exception guard** | `Cypress.on('uncaught:exception', () => false)` prevents 3rd-party JS from failing tests |
| **Singleton POMs** | `export default new ClassName()` ensures consistent shared instances |
| **Method chaining** | POM action methods return `this` for fluent, readable test code |
| **Data-driven tests** | `forEach` loops over fixture arrays generate dynamic test cases |
| **Descriptive test names** | All `it()` descriptions read as sentences stating expected behavior |
| **Test isolation** | Each `it()` block is independently runnable; state restored in `beforeEach` |
| **Full report pipeline** | Merge → HTML pipeline ensures CI always has a complete report |

---

*Documentation generated: September 29, 2026 | Framework: Cypress 16.1.0 | Target: CURA Healthcare Service*
