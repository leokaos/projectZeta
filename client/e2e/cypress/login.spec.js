describe('Login Test', () => {

  it('Login', () => {

    cy.visit('http://localhost:4200');

    cy.get('[name="username"]').type('leo');
    cy.get('[name="password"]').type('123');

    cy.get('.botao-login').click();

    cy.get('div.grid-container> h1').should('be.visible').should('text', 'Dashboard');

  });

});