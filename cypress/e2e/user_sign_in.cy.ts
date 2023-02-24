/// <reference types="cypress" />


context('Sign In', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/sign_in')
    })

    it('Successful Sign In', () => {

        cy.fixture('sign_up_in_success_mock.json').then((register_mock) => {
            cy.intercept('POST', '/account/login/', register_mock).as('signUpApi')
        })

        cy.fixture('get_user_success_mock.json').then((user_mock) => {
            cy.intercept('GET', '/account/user/', user_mock).as('userApi')
        })

        cy.get('[data-cy="formSignIn"]')
            .children()
            .and('contain', 'Email')
            .and('contain', 'Password')

        cy.get('[data-cy="textEmail"]')
            .type('MockEmail@gmail.com')

        cy.get('[data-cy="textPassword"]')
            .type('MockPass@123')

        cy.get('[data-cy="buttonSubmit"]').click()

    })


    it('Failed Sign In', () => {

        cy.fixture('sign_up_in_failed_mock.json').then((register_mock) => {
            cy.intercept('POST', '/account/login/', register_mock).as('signUpApi')
        })

        cy.fixture('get_user_failed_mock.json').then((user_mock) => {
            cy.intercept('GET', '/account/user/', user_mock).as('userApi')
        })

        cy.get('[data-cy="formSignIn"]')
            .children()
            .and('contain', 'Email')
            .and('contain', 'Password')

        cy.get('[data-cy="textEmail"]')
            .type('MockEmail@gmail.com')

        cy.get('[data-cy="textPassword"]')
            .type('MockPass@123')

        cy.get('[data-cy="buttonSubmit"]').click()

    })


})