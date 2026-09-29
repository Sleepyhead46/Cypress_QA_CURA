# Cypress E2E Automation Framework
**CURA Healthcare Service — Learning Project**

---

Hey there! 👋 This is a Cypress automation framework built around the [CURA Healthcare demo site](https://katalon-demo-cura.herokuapp.com) — a free, publicly accessible app that's perfect for learning end-to-end testing. The project goes from the very basics all the way up to CI/CD pipelines, Docker, and accessibility testing.

**Demo site:** https://katalon-demo-cura.herokuapp.com  
**Login:** Username: `John Doe` / Password: `ThisIsNotAPassword`

> 📖 **Comprehensive Technical Reference:** Looking for in-depth method signatures, POM design, custom command implementations, lifecycle hooks, and complete configuration breakdowns? See **[detaile.md](detaile.md)**.

---

## What's in this project?

Tests are split into three progressive levels (23 spec files in total) so you can follow the structured path or jump straight to what you need:

- **Basic (7 specs)** — getting started (visiting pages, clicking, typing, forms, assertions, navigation, history, logout)
- **Intermediate (7 specs)** — fixtures, custom commands, Page Object Model, data-driven tests, hooks, uploads
- **Advanced (9 specs)** — API testing, network interception, sessions, accessibility, performance, flake handling

### Complete Test Catalog (23 Specs)

<details>
<summary><b>Level 1 — Basic Specs (7 files)</b></summary>

| Spec File | Focus Area | What it tests |
|---|---|---|
| `01_visit_and_headings.cy.js` | Core DOM | Home page load, header elements, viewport responsiveness |
| `02_login_happy_path.cy.js` | Authentication | Valid login flow, credential submission, `#appointment` redirect |
| `03_login_failure.cy.js` | Validation | Invalid credentials, login error alerts, required field checks |
| `04_book_appointment.cy.js` | Forms | Full appointment booking, radio/dropdown/calendar selection |
| `05_navigation_menu.cy.js` | Navigation | Sidebar hamburger menu toggle, navigation links, overlay |
| `06_appointment_history.cy.js` | State & History | Verifying booked appointment records and empty history state |
| `07_logout.cy.js` | Session End | Menu logout link, session termination, redirect back to home |

</details>

<details>
<summary><b>Level 2 — Intermediate Specs (7 files)</b></summary>

| Spec File | Focus Area | What it tests |
|---|---|---|
| `01_fixtures_login.cy.js` | Test Data | Data-driven authentication using `cypress/fixtures/users.json` |
| `02_custom_commands.cy.js` | Reusability | Exercising reusable commands (`cy.login`, `cy.bookAppointment`, etc.) |
| `03_page_objects.cy.js` | POM Pattern | Clean abstractions using LoginPage, AppointmentPage, SummaryPage |
| `04_data_driven_booking.cy.js` | Data-Driven | Looping through `appointments.json` to verify multiple scenarios |
| `05_hooks_and_context.cy.js` | Test Lifecycle | Suite structure with `before`, `beforeEach`, `afterEach` hooks |
| `06_multiple_assertions.cy.js` | Assertions | Chained assertions, table records, CSS properties, multiple checks |
| `07_file_upload_or_download.cy.js` | File Handling | Document handling and file upload workflows via `.selectFile()` |

</details>

<details>
<summary><b>Level 3 — Advanced Specs (9 files)</b></summary>

| Spec File | Focus Area | What it tests |
|---|---|---|
| `01_api_testing.cy.js` | API Testing | Direct HTTP calls with `cy.request()` (GET/POST, status codes, headers) |
| `02_network_intercept.cy.js` | Interception | Stubbing and spying network traffic using `cy.intercept()` |
| `03_session_login.cy.js` | Performance | Lightning-fast authentication caching using `cy.session()` |
| `04_dynamic_elements.cy.js` | Dynamic DOM | Asynchronous loading, conditional elements, dynamic wait patterns |
| `05_visual_or_viewport.cy.js` | Multi-Device | Layout validation across mobile, tablet, and desktop viewports |
| `06_negative_scenarios.cy.js` | Edge Cases | SQL injection strings, boundary values, malformed inputs |
| `07_accessibility.cy.js` | A11y Audit | WCAG 2.1 Level A/AA compliance auditing with `cypress-axe` |
| `08_performance_timing.cy.js` | Performance | Page load SLAs and browser performance API metrics |
| `09_flaky_test_handling.cy.js` | Reliability | Retry strategies, retry loops, resilient locator patterns |

</details>

The CURA app has everything you'd want to practice on:

| Feature | Selectors to know |
|---|---|
| Login / Logout | `#txt-username`, `#txt-password`, `#btn-login` |
| Dropdown | `#combo_facility` |
| Checkbox | `#chk_hospotal_readmission` |
| Radio buttons | `#radio_program_medicare` / `medicaid` / `none` |
| Date input | `#txt_visit_date` |
| Textarea | `#txt_comment` |
| Book appointment | `#btn-book-appointment` |
| Confirmation page | `#facility`, `#visit_date`, `#program` |
| History panels | `.panel.panel-info` |
| Sidebar nav | `#sidebar-wrapper` |

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| Cypress | 16.1.0 | Core test runner |
| JavaScript | ES2015+ | Test language |
| Node.js | 24.x | Runtime |
| Mocha / Chai | bundled | Test framework + assertions |
| Mochawesome | 8.1.1 | HTML reports |
| cypress-axe | 1.7.0 | Accessibility testing |
| axe-core | 4.13.0 | A11y engine |
| Docker | latest | Containerized execution |
| GitHub Actions | — | CI/CD |

---

## Project layout

```
cypress_1/
│
├── cypress/
│   ├── e2e/
│   │   ├── basic/           # 7 beginner specs
│   │   ├── intermediate/    # 7 intermediate specs
│   │   └── advanced/        # 9 advanced specs
│   │
│   ├── fixtures/            # Test data (JSON + txt)
│   ├── pages/               # Page Object classes
│   ├── support/             # Custom commands + setup
│   ├── screenshots/
│   ├── videos/
│   └── reports/
│
├── cypress.config.js        # Global test configuration
├── detaile.md               # Complete 1,100+ line technical architecture & spec reference
├── package.json             # Dependencies and test runner scripts
├── Dockerfile               # Containerized test runner
├── docker-compose.yml       # Multi-container reporting setup
└── .github/workflows/cypress.yml  # GitHub Actions CI workflow
```

---

## Getting started

You'll need Node.js 18+ and npm. Then just:

```bash
git clone https://github.com/your-org/cypress-automation.git
cd cypress-automation
npm install
```

---

## Running tests

**Open the interactive GUI** (great for development and debugging):
```bash
npm run cy:open
# or
npx cypress open
```

**Run everything headlessly** (great for CI):
```bash
npm run cy:run
# or
npx cypress run
```

**Run just one level:**
```bash
npm run test:basic
npm run test:intermediate
npm run test:advanced
```

**Full NPM Scripts Reference:**

```bash
# Tier & Suite Execution
npm run test:smoke         # Fast critical-path smoke check
npm run test:regression    # Full test suite (all 23 specs)
npm run test:basic         # Run all 7 Basic specs
npm run test:intermediate  # Run all 7 Intermediate specs
npm run test:advanced      # Run all 9 Advanced specs
npm run test:ui            # All UI specs (Basic + Intermediate)
npm run test:api           # API tests only

# Browser Runners
npm run cy:run:chrome      # Headless run in Google Chrome
npm run cy:run:edge        # Headless run in Microsoft Edge
npm run cy:run:headless    # Explicit headless flag

# Complete Pipeline & Reporting
npm run test:full          # Clean reports -> Run all specs -> Generate HTML report
npm run clean:reports      # Delete previous reports, screenshots, and videos
npm run report             # Merge Mochawesome JSONs and generate HTML report
```

---

## Cross-browser testing

```bash
npx cypress run --browser chrome   # recommended
npx cypress run --browser edge
```

> Electron support is deprecated in Cypress 16 — stick with Chrome or Edge.

---

## HTML reports

Mochawesome outputs one JSON file per spec. Here's how to turn them into a nice report:

```bash
npx cypress run           # runs tests and saves JSON
npm run report:merge      # merges all JSON files
npm run report:generate   # produces the HTML report
```

Or do it all at once:
```bash
npm run report
```

The report lands at `cypress/reports/html/report.html`. Open it in any browser to see pass/fail counts, per-test durations, failure screenshots, and the full test hierarchy.

---

## Docker

If you'd rather not install browsers locally, everything runs in Docker:

```bash
docker build -t cypress-tests .
docker run --rm cypress-tests
```

Or with Docker Compose (mounts reports to your machine):
```bash
docker-compose up --exit-code-from cypress
```

Results land in `./cypress-results/` on your host.

---

## CI/CD (GitHub Actions)

The workflow at `.github/workflows/cypress.yml` runs on every push and:

1. Installs Node and dependencies
2. Runs all specs headlessly in Chrome
3. Merges JSON reports and generates HTML
4. Uploads screenshots, videos, and the report as workflow artifacts
5. Fails the workflow if any test fails

Find your artifacts at:
```
GitHub Repo → Actions → [your run] → Artifacts
```

**Keeping credentials out of your code:**
```yaml
env:
  CYPRESS_USERNAME: ${{ secrets.CYPRESS_USERNAME }}
  CYPRESS_PASSWORD: ${{ secrets.CYPRESS_PASSWORD }}
```

Then in tests: `Cypress.env('USERNAME')`. Never hardcode real passwords.

---

## Configuration

Everything lives in `cypress.config.js`:

| Setting | Value | What it does |
|---|---|---|
| `baseUrl` | `https://katalon-demo-cura.herokuapp.com` | Lets you use `cy.visit('/')` |
| `viewportWidth` | `1280` | Default browser width |
| `viewportHeight` | `800` | Default browser height |
| `defaultCommandTimeout` | `8000ms` | How long Cypress retries assertions |
| `pageLoadTimeout` | `30000ms` | Max time to wait for a page load |
| `retries.runMode` | `1` | Retries once in headless CI |
| `retries.openMode` | `0` | No retries in the GUI |
| `screenshotOnRunFailure` | `true` | Auto-screenshot on failure |

**Local secrets** — create `cypress.env.json` (it's already in `.gitignore`):
```json
{
  "USERNAME": "John Doe",
  "PASSWORD": "ThisIsNotAPassword"
}
```

---

## Custom commands

All in `cypress/support/commands.js`:

| Command | What it does |
|---|---|
| `cy.login(username, password)` | Fills and submits the login form |
| `cy.logout()` | Opens sidebar and logs out |
| `cy.openSidebar()` | Clicks the menu toggle |
| `cy.closeSidebar()` | Closes the menu |
| `cy.navigateViaSidebar(linkText)` | Opens sidebar and clicks a link by name |
| `cy.bookAppointment(options)` | Fills and submits the whole appointment form |
| `cy.verifyAppointmentSummary(options)` | Checks all fields on the confirmation page |

---

## Page Object Model

Page classes live in `cypress/pages/`. The idea: selectors are isolated per page, so if a selector changes you fix it in one place and every test using that page is fixed automatically.

| Class | What it covers |
|---|---|
| `LoginPage.js` | Login form |
| `AppointmentPage.js` | Appointment booking form |
| `SummaryPage.js` | Confirmation / summary page |
| `HistoryPage.js` | Appointment history |
| `Navbar.js` | Sidebar navigation |

A few rules I follow here:
- Methods return `this` so you can chain calls
- Assertions live in the test files, not inside page objects
- No huge "god objects" — each file covers one page

---

## Test tags

Every `describe` block carries `{ tags: [...] }` metadata:

| Tag | What it targets |
|---|---|
| `@smoke` | Fast happy-path tests |
| `@basic` | Beginner level |
| `@intermediate` | Reusability and structure |
| `@advanced` | API, sessions, interception |
| `@api` | `cy.request()` tests |
| `@a11y` | Accessibility audits |
| `@negative` | Error cases and edge conditions |
| `@performance` | Timing SLA checks |
| `@pom` | Page Object Model demos |

---

## Authentication patterns

**Simple UI login** (used in basic tests):
```js
cy.visit('/profile.php#login');
cy.get('#txt-username').type('John Doe');
cy.get('#txt-password').type('ThisIsNotAPassword');
cy.get('#btn-login').click();
```

**Cached session** (used in advanced tests — much faster):
```js
cy.session(['John Doe', 'pass'], () => {
  cy.visit('/profile.php#login');
  cy.get('#txt-username').type('John Doe');
  cy.get('#txt-password').type('ThisIsNotAPassword', { log: false });
  cy.get('#btn-login').click();
  cy.url().should('include', '#appointment');
}, {
  validate() {
    cy.getCookie('PHPSESSID').should('exist');
  }
});
```

`cy.session()` snapshots cookies and localStorage after the first login and restores them instantly for every following test. In a big suite, this makes a noticeable difference.

---

## Accessibility testing

```bash
npx cypress run --spec "cypress/e2e/advanced/07_accessibility.cy.js"
```

Uses `cypress-axe` + `axe-core` to scan for WCAG 2.1 Level A/AA violations. That said — automated scanners catch roughly 30–57% of actual accessibility issues. They're no substitute for testing with a real screen reader (NVDA, JAWS, VoiceOver) or checking keyboard navigation manually.

---

## Learning path

Working through this from scratch? Here's the progression:

```
Level 1 — Beginner
  cy.visit / cy.get / cy.contains
  click / type / clear / check / select
  Assertions: visible, text, value, URL

Level 2 — Intermediate
  cy.fixture (test data from files)
  Cypress.Commands.add (reusable custom commands)
  before / beforeEach / afterEach hooks
  Page Object Model
  Data-driven testing
  .selectFile() for uploads

Level 3 — Advanced
  cy.request() for API testing
  cy.intercept() + cy.wait() for network mocking
  cy.session() for fast logins
  Dynamic element strategies
  cypress-axe for accessibility scanning
  Performance timing assertions
  Negative / edge case testing

Level 4 — Professional
  Mochawesome HTML reports
  Docker containerization
  GitHub Actions CI/CD
  Cross-browser testing
  Retry strategies
  Secrets and environment management
  Test tagging and suite organization
```

---

## Running tests in parallel

**Free — split specs across terminals manually:**
```bash
# Terminal 1
npx cypress run --spec "cypress/e2e/basic/**/*.cy.js"

# Terminal 2
npx cypress run --spec "cypress/e2e/intermediate/**/*.cy.js"

# Terminal 3
npx cypress run --spec "cypress/e2e/advanced/**/*.cy.js"
```

**Paid — Cypress Cloud auto-distribution:**
```yaml
# Needs CYPRESS_RECORD_KEY set as a GitHub Actions secret
npx cypress run --record --parallel
```

> Cypress itself is free and open source. Cypress Cloud — which adds automatic spec distribution, flaky test detection, and analytics — is a separate paid product.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `ERESOLVE` on install | `npm install --legacy-peer-deps` |
| Tests can't find elements | CURA is on Heroku and cold-starts. Wait ~30 seconds and retry |
| Electron deprecation warning | Use `--browser chrome` instead |
| Date picker blocks form submit | `cy.get('h2').click()` after typing the date to dismiss the calendar popup |
| `cy.session()` validation fails | Delete the `cypress/cache` folder and re-run |
| Mochawesome report missing | Only run `npm run report` after a full `npx cypress run` finishes |
| POM import errors | Check that `type: "commonjs"` is in `package.json` and you're using `import` syntax in spec files |

---

## License

ISC

---

*Built with Cypress 16 on the CURA Healthcare demo. All selectors verified against the live app — no made-up elements.*
