
describe('Categoria', () => {

  beforeEach( () => {
    cy.kcLogin("user");
    cy.visit("/categorias");
  });


  it('adicionar categoria e remover', () => {

    cy.get('#adicionar-categoria').click();
    cy.get('#categoria-descricao').type('TESTE');
    cy.get('#btn-criar-categoria').click();

    cy.contains('TESTE');

    cy.get('[id^="remover-categoria-"]').last().click();
  })
 
})
