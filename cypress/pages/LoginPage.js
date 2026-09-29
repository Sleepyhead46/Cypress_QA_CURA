/**
 * Page Object representing the CURA Healthcare Login Page
 */
class LoginPage {
  // Elements
  get heading() {
    return cy.get('h2');
  }

  get subHeading() {
    return cy.get('.lead');
  }

  get demoAccountBox() {
    return cy.get('.alert-info');
  }

  get usernameInput() {
    return cy.get('#txt-username');
  }

  get passwordInput() {
    return cy.get('#txt-password');
  }

  get loginButton() {
    return cy.get('#btn-login');
  }

  get errorMessage() {
    return cy.get('.text-danger');
  }

  // Navigation
  visit() {
    cy.visit('/profile.php#login');
    return this;
  }

  // Actions
  fillUsername(username) {
    if (username) {
      this.usernameInput.clear().type(username);
    } else {
      this.usernameInput.clear();
    }
    return this;
  }

  fillPassword(password) {
    if (password) {
      this.passwordInput.clear().type(password, { log: false });
    } else {
      this.passwordInput.clear();
    }
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();
