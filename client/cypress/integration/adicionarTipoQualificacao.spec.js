describe('Tipo Qualificacoes', function () {

  it('Criar e Deletar um tipo de qualificacao', function () {

    cy.visit('http://localhost:4200/tipoQualificacoes');

    cy.get('#adicionarTipoQualificacao > .mat-button-wrapper').click();

    let nameTipoQualificacao = 'test tipo';

    cy.get('#tipoQualificacao_descricao').type(nameTipoQualificacao);

    cy.get('#btnCriarTipoQualificacao > .mat-button-wrapper').click();

    cy.contains(nameTipoQualificacao);

    cy.get('.quadro-numeros').last().within(() => {

      cy.get('.btnDelete').click();

    });
    
    cy.contains(nameTipoQualificacao).should('not.exist');

  })

});