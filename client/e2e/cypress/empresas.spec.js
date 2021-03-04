
describe('Empresas Test', () => {

  it('Adicionar Empresa e Depois Removida', () => {

    cy.visit('http://localhost:4200');

    cy.get('[name="username"]').type('leo');
    cy.get('[name="password"]').type('123');

    cy.get('.botao-login').click();

    cy.get('#toggle-menu').click();
    cy.get('#link-empresas').click();

    cy.get('div.container').should('be.visible');
    cy.get('div.container> div.panel-button> h1').should('be.visible').should('text', 'Empresas');

    cy.get('table').then((element) => {

      let numberElements = element.find('tr').length;

      cy.get('#adicionarEmpresa').click();

      cy.get('table').find('tr').should('have.length', numberElements + 1);

      cy.get('#nomeEmpresa').type('Test');
      cy.get('#adicionar-empresa').click();

      cy.get('table').find('tr').should('have.length', numberElements + 1);

      cy.get('#nomeEmpresa').should('not.exist');

      cy.get('#remove-empresa-' + (numberElements - 1)).click();

      cy.get('body').contains('Sucesso!')

    });

  });

});