const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://katalon-demo-cura.herokuapp.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    downloadsFolder: "cypress/downloads",
    fixturesFolder: "cypress/fixtures",
    video: false,
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // Configuration & environment handling for Cypress 16+
      // Non-sensitive runtime values can be set or overridden here
      config.env.demoSite = "CURA Healthcare Service";
      config.env.secondaryDemoUrl = "https://the-internet.herokuapp.com";

      // Return modified config
      return config;
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mocha",
    overwrite: false,
    html: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
});
