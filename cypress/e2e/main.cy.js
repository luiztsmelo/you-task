/// <reference types="cypress" />

describe('you-task', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
    
    cy.get('#email-input')
      .type('test@gmail.com').should('have.value', 'test@gmail.com')
      
    cy.get('#password-input')
      .type('123456').should('have.value', '123456')

    cy.get('#login-btn').click()

    cy.wait(5000)
  })

  it('can add a task', () => {
    cy.get('#add-task-form-btn').click()

    cy.get('#task-text-input')
      .type('Get a job').should('have.value', 'Get a job')

    cy.get('#add-task-btn').click()
  })
})
