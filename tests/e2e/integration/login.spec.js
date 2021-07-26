/// <reference types="Cypress" />

describe("Feature List access", () => {
  it("should redirect unauthenticated user to login page", () => {
    cy.visit(`/`);
    cy.url().should("include", `/login`);
  });

  it("should allow userAdmin to connect", () => {
    cy.get("#username").type("userAdmin");
    cy.get("#password").type("password");
    cy.get("button#login").click();

    cy.get("#title").should("have.text", `Features`);
  });

  it("should logout userAdmin", () => {
    cy.get("button#logout").click();

    cy.url().should("include", `/login`);
  });
});

describe("Bad Login", () => {
  before(() => {
    cy.visit(`/`);
  });

  it("should show bad username/password message and have empty fields", () => {
    cy.get("#username").type("user");
    cy.get("#password").type("password");
    cy.get("button#login").click();

    cy.get("div#error-message").should("have.text", "Bad username/password");
    cy.get("#username").should("be.empty");
    cy.get("#password").should("be.empty");
  });
});

describe("Not Admin Login", () => {
    before(() => {
      cy.visit(`/`);
    });
  
    it("should show This user is not admin message and have empty fields", () => {
      cy.get("#username").type("userApp");
      cy.get("#password").type("password");
      cy.get("button#login").click();
  
      cy.get("div#error-message").should("have.text", "This user is not admin");
      cy.get("#username").should("be.empty");
      cy.get("#password").should("be.empty");
    });
  });