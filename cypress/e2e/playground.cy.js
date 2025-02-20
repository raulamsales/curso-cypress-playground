beforeEach(() => {
  cy.visit('https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html')
});
describe('template spec', () => {

  it('show promo banner', () => {
    cy.get('#promotional-banner')
    .should('be.visible')
  });
  it('teste que clica no botão Subscribe', () => {
    cy.clock()
    cy.get('button[type="submit"]')
    .should('contain', 'Subscribe')
    .click()

    cy.get('#success')
    .should('be.visible')
    cy.tick(3000)
    cy.get('#success')
    .should('not.be.visible')
  });

  it('Sign Here Test', () => {
    cy.get('#signature-textarea')
    .type("TesteNome")
    .should('have.value', 'TesteNome')

    cy.get('#signature').should('contain', 'TesteNome')
  });

  it('teste que digite o seu nome no segundo campo “Sign here” e marque a caixa de seleção “Show signatures preview".', () => {
    cy.get('#signature-textarea-with-checkbox')
    .type('MyName')
    .should('have.value', 'MyName')

    cy.get('#signature-checkbox').check().should('be.checked')
    cy.get('#signature-triggered-by-check').should('be.visible').contains('MyName')

    cy.get('#signature-checkbox').uncheck().should('not.be.checked')
    cy.get('#signature-triggered-by-check').should('not.be.visible')
  });

  it.only('teste que marca os radio buttons On e Off', () => {
    cy.get('input[type="radio"]#on').check().should('be.checked')
    cy.get('#on-off').should('contain','ON')

    cy.get('input[type="radio"]#off').check().should('be.checked')
    cy.get('#on-off').should('contain','OFF')
  });
})