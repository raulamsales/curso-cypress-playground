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

  it.only('Sign Here Test', () => {
    cy.get('#signature-textarea')
    .type("TesteNome")
    .should('have.value', 'TesteNome')

    cy.get('#signature').should('contain', 'TesteNome')
  });
})