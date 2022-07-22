
describe('Qualificação', () => {

  beforeEach( () => {
    cy.kcLogin("user");
    cy.visit("/qualificacoes");
  });


  it('adicionar qualificações', () => {

    cy.get('#tabela-qualificacoes').should('be.visible');

    cy.get('#adicionarQualificacao').click();

    cy.get('#descricao').type('teste');
    cy.get('#versao').type('1');

    cy.get('#adicionar-equivalencia').should('be.disabled', true);

    cy.get('mat-select[id="categoria"]').click().get('mat-option').contains('Database').click();
    cy.get('#adicionar-equivalencia').click();
    
    cy.get('#table-equivalencia').find('tr').should('have.length', 2);

  })
 
})
