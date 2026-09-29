/**
 * Page Object representing the Navigation Menu and Sidebar Wrapper
 */
class Navbar {
  get menuToggle() {
    return cy.get('#menu-toggle');
  }

  get menuClose() {
    return cy.get('#menu-close');
  }

  get sidebarWrapper() {
    return cy.get('#sidebar-wrapper');
  }

  get homeLink() {
    return cy.get('#sidebar-wrapper a').contains('Home');
  }

  get loginLink() {
    return cy.get('#sidebar-wrapper a').contains('Login');
  }

  get historyLink() {
    return cy.get('#sidebar-wrapper a').contains('History');
  }

  get profileLink() {
    return cy.get('#sidebar-wrapper a').contains('Profile');
  }

  get logoutLink() {
    return cy.get('#sidebar-wrapper a').contains('Logout');
  }

  open() {
    this.menuToggle.click();
    this.sidebarWrapper.should('have.class', 'active');
  }

  close() {
    this.menuClose.click();
    this.sidebarWrapper.should('not.have.class', 'active');
  }

  navigateTo(name) {
    this.open();
    cy.get('#sidebar-wrapper').contains('a', name).click();
  }
}

export default new Navbar();
