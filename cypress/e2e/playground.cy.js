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

  it('teste que marca os radio buttons On e Off', () => {
    cy.get('input[type="radio"]#on').check().should('be.checked')
    cy.get('#on-off').should('contain','ON')

    cy.get('input[type="radio"]#off').check().should('be.checked')
    cy.get('#on-off').should('contain','OFF')
  });

  it('teste que selecione um dos tipos disponíveis ', () => {
   cy.get('#selection-type').select('Basic')
    cy.get('#selection-type').should('have.value', 'basic')

    cy.get('#selection-type').select('standard')
    cy.get('#selection-type').should('have.value', 'standard')

    cy.get('#selection-type').select(3)
    cy.get('#selection-type').should('have.value', 'vip')
    cy.get('#select-selection > strong').should('contain', 'VIP')
  });

  it('teste que seleciona algumas frutas e certifique-se de que as frutas corretas sejam exibidas.', () => {
    cy.get('#fruit').select(['apple', 'cherry', 'elderberry'])
    cy.get('#fruit')
    .invoke('val')
    .should('deep.equal', ['apple', 'cherry', 'elderberry'])
  });

  it('este que seleciona um arquivo e certifique-se de que o nome correto do arquivo seja exibido.', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should('have.prop', 'files')
    .its('0.name')
    .should('be.equal', 'example.json')
  });

  it('teste que intercepte a requisição acionada ao clicar no botão Get TODO', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1')
    .as('getToDo')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@getToDo')
    .its('response.statusCode')
    .should('be.equal' , 200)
  });

  it.only('teste que intercepte a requisição acionada ao clicar no botão Get TODO, mas desta vez, use uma fixture como resposta da requisição', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { fixture: 'todo'}).as('getTodo')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo')
    .its('response.statusCode')
    .should('be.equal' , 200)
  });
})