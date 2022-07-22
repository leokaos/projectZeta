
describe('Empresas', () => {

  beforeEach(() => {
    cy.kcLogin('user');
    cy.visit('/empresas');
  });


  it('adicionar empresa e remover', () => {

    cy.get('#table-empresas').should('be.visible');

    cy.get('#table-empresas').find('tr').then($elements => {

      //CRIANDO NOVA EMPRESA
      cy.get('#adicionar-empresa').click();
      cy.get('#table-empresas').find('tr').should('have.length', $elements.length + 1);
      cy.get('#nomeEmpresa').type('EMPRESA TESTE');
      cy.get('#save-empresa').click();

      //REMOVENDO NOVA EMPRESA
      cy.get('#remove-empresa-' + ($elements.length - 1) ).click();

      cy.get('#table-empresas').find('tr').should('have.length', $elements.length);

    });

  })

  it('tentar remover uma empresa que tem uma vaga', () => {

    cy.get('#table-empresas').should('be.visible');

    cy.get('#remove-empresa-0').click();

    cy.contains('empresa.possui.vagas');

  })

  it('adicionar empresa e cancelar', () => {

    cy.get('#table-empresas').should('be.visible');

    cy.get('#table-empresas').find('tr').then($elements => {

      //CRIANDO NOVA EMPRESA
      cy.get('#adicionar-empresa').click();
      cy.get('#table-empresas').find('tr').should('have.length', $elements.length + 1);
      cy.get('#nomeEmpresa').type('EMPRESA TESTE');
      cy.get('#cancela-empresa').click();

      cy.get('#table-empresas').find('tr').should('have.length', $elements.length);

    });

  })

  it('buscar empresa por nome', () => {

    cy.get('#table-empresas').should('be.visible');

    cy.get('#search-empresa').type('Churros');

    cy.get('#table-empresas').find('tr').should('have.length', 2);

  })

})
