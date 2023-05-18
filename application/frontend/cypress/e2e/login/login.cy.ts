/// <reference types="cypress" />

describe('Login user test', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.getByDataTestId('login-email').as('loginEmailInput');
    cy.getByDataTestId('login-password').as('loginPasswordInput');
    cy.getByDataTestId('login-submit').as('loginButtonSubmit');
    cy.intercept('POST', '/login').as('loginUsers');
  });

  it('shot throw error if wrong data is typed', () => {
    cy.intercept('POST', '/login', { forceNetworkError: true }).as(
      'loginUsers'
    );
    cy.get('@loginEmailInput').type('test@test.com', { delay: 0 });
    cy.get('@loginPasswordInput').type('test', { delay: 0 });
    cy.get('@loginButtonSubmit').click();

    cy.getByDataTestId('log-message').should('exist');
  });

  it('shot throw error if wrong data is typed', () => {
    cy.intercept('POST', '/login', {
      data: {},
      error: { message: 'test' },
      status: 404
    }).as('loginUsers');
    cy.get('@loginEmailInput').type('test@test.com', { delay: 0 });
    cy.get('@loginPasswordInput').type('test', { delay: 0 });
    cy.get('@loginButtonSubmit').click();

    cy.getByDataTestId('log-message').should('exist');
  });
});
