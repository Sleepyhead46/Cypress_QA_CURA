# Cypress E2E Automation Framework
**CURA Healthcare Service — Learning Project**

---

Hey there! 👋 This is a Cypress automation framework built around the [CURA Healthcare demo site](https://katalon-demo-cura.herokuapp.com) — a free, publicly accessible app that's perfect for learning end-to-end testing. The project goes from the very basics all the way up to CI/CD pipelines, Docker, and accessibility testing.

**Demo site:** https://katalon-demo-cura.herokuapp.com
**Login:** Username: `John Doe` / Password: `ThisIsNotAPassword`

---

## What's in this project?

Tests are split into three levels so you can follow the path or jump straight to what you need:

- **Basic** — getting started (visiting pages, clicking, typing)
- **Intermediate** — fixtures, custom commands, Page Object Model, data-driven tests
- **Advanced** — API testing, network interception, sessions, accessibility, performance

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
├── cypress.config.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/cypress.yml
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
npx cypress open
```

**Run everything headlessly** (great for CI):
```bash
npx cypress run
```

**Run just one level:**
```bash
npx cypress run --spec "cypress/e2e/basic/**/*.cy.js"
npx cypress run --spec "cypress/e2e/intermediate/**/*.cy.js"
npx cypress run --spec "cypress/e2e/advanced/**/*.cy.js"
```

**Using the npm scripts:**
```bash
npm run test:smoke       # Fast critical-path check
npm run test:regression  # Full suite
npm run test:api         # API tests only
npm run test:ui          # Basic + intermediate UI tests
npm run test:full        # Run everything + generate HTML report
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
# Cypress_QA_CURA
