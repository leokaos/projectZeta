
describe('Categorias Test', () => {

  it('Adicionar Categoria e Remover em seguida', () => {

    cy.visit('http://localhost:4200');

    cy.get('[name="username"]').type('leo');
    cy.get('[name="password"]').type('123');

    cy.get('.botao-login').click();

    cy.get('#toggle-menu').click();
    cy.get('#link-categorias').click();

    cy.get('div.container').should('be.visible');
    cy.get('div.container> div.panel-button> h1').should('be.visible').should('text', 'Categorias');

    cy.get('mat-card').then((element) => {

      let size = element.length;

      cy.get('mat-card').should('have.length', size);

      cy.get('#adicionar-categoria').click();

      cy.get('body').contains('Criar Categoria');
      cy.get('#categoria-descricao').type('Test Categoria');
      cy.get('#btn-criar-categoria').click();
      cy.get('body').contains('Test Categoria');

      cy.get('mat-card').should('have.length', size + 1);

      cy.get('#remover-categoria-' + (size - 1)).click();

      cy.get('mat-card').should('have.length', size);

    });

  });

});