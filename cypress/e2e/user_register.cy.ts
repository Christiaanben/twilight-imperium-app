/// <reference types="cypress" />


context('Register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/sign_up')
  })

  it('Successful Register', () => {

    cy.fixture('sign_up_in_success_mock.json').then((register_mock) => {
      cy.intercept('POST', '/account/registration/', register_mock).as('signUpApi')
    })

    cy.fixture('get_user_success_mock.json').then((user_mock) => {
      cy.intercept('GET', '/account/user/', user_mock).as('userApi')
    })

    cy.get('[data-cy="formSignUp"]')
        .children()
        .should('contain', 'Display Name')
        .and('contain', 'Email')
        .and('contain', 'Password')

    cy.get('[data-cy="textFieldDisplayName"]')
        .type('MockName')

    cy.get('[data-cy="textEmail"]')
        .type('MockEmail@gmail.com')

    cy.get('[data-cy="textPassword"]')
        .type('MockPass@123')

    cy.get('[data-cy="buttonSubmit"]').click()

  })


  it('Failed Register', () => {

    cy.fixture('sign_up_in_failed_mock.json').then((register_mock) => {
      cy.intercept('POST', '/account/registration/', register_mock).as('signUpApi')
    })

    cy.fixture('get_user_failed_mock.json').then((user_mock) => {
      cy.intercept('GET', '/account/user/', user_mock).as('userApi')
    })

    cy.get('[data-cy="formSignUp"]')
        .children()
        .should('contain', 'Display Name')
        .and('contain', 'Email')
        .and('contain', 'Password')

    cy.get('[data-cy="textFieldDisplayName"]')
        .type('MockName')

    cy.get('[data-cy="textEmail"]')
        .type('MockEmail@gmail.com')

    cy.get('[data-cy="textPassword"]')
        .type('MockPass@123')

    cy.get('[data-cy="buttonSubmit"]').click()

  })


})