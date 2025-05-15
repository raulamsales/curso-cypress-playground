beforeEach(() => {
      //const now = new Date(Date.UTC(2024, 5, 16, 14, 30, 0, 0))
      //cy.clock(now)
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

  it('teste que intercepte a requisição acionada ao clicar no botão Get TODO, mas desta vez, use uma fixture como resposta da requisição', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { fixture: 'todo'}).as('getTodo')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@getTodo')
    .its('response.statusCode')
    .should('be.equal' , 200)
  });

  it('teste que simula falha na API', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { statusCode: 500 }).as('serverFailure')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@serverFailure')
    .its('response.statusCode')
    .should('be.equal', 500)

    cy.get('#intercept > .error').should('be.visible')
  });

  it('Simulando uma falha na rede', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', { forceNetworkError: true }).as('networkError')
    cy.contains('button', 'Get TODO').click()
    //cy.wait('@networkError')
    cy.contains('.error', "Oops, something went wrong. Check your internet connection, refresh the page, and try again.").should('be.visible')
    //cy.get('#intercept > .error').should('contain', 'Oops, something went wrong. Check your internet connection, refresh the page, and try again.')
  });

  it('Criando um simples teste de API com Cypress', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/todos/1')
    .its('status')
    .should('be.equal', 200)
  });

  it('Experimente criando um teste que seleciona um nível invocando seu valor e acionando a mudança. Certifique-se de que o nível correto seja exibido.', () => {
    cy.get('input[type="range"]')
    .invoke('val', 5)
    .trigger('change')
  });
  
  Cypress._.times(10, index =>{
    it(`testcase ${index + 1}`, () => {
      cy.get('#level')
      .invoke('val', index + 1)
      .trigger('change')
    });
  })

  it('Lidando com inputs do tipo date', () => {
    cy.get('#date').type('2024-06-16').blur().should('have.value', '2024-06-16')
  });

  it('Protegendo dados sensíveis com Cypress', () => {
    cy.get('#password').type(Cypress.env('password'), { delay: 0, log: false})
    cy.get('#show-password-checkbox').check().should('be.checked')
    cy.get('#password[type="text"]').should('exist')
    cy.get('#password[type="password"]').should('not.exist')
  });

  it('Contando itens com Cypress', () => {
    cy.get("ul#animals li").should('have.length', 5)
  });

  it('Congelando 🧊 o relógio ⌚ do navegador com Cypress', () => {
    cy.get('#date-section-paragraph').should('contain', '2024-06-16')
  });

  it('Usando dados gerados pela aplicação como entrada para os testes', () => {
    cy.get('#timestamp').then(element =>{
      const value = element[0].innerText
      cy.get('input#code').type(value)
      cy.get('input#code').should('have.value', value)
      
    })
  });

  it.only("test that clicks the 'Download a text file' link. Make sure to read the file's content to check if it's correct.", () => {
    cy.get('[download="example.txt"]').click()
    cy.readFile('cypress/downloads/example.txt').should('contain', 'Hello, World!')
  });
})