describe("Clientes", () => {

    it("registrar um usuário para acesso ao sistema", () => {
        cy.visit('http://localhost:5173/register/')
        cy.get('input[type = text]').should('have.attr', 'id', 'formPlaintextName').focus().type("Teste cypress")
        cy.get('input[type = email]').should('have.attr', 'id', 'formPlaintextEmail').focus().type("teste@cypress")
        cy.get('#formPlaintextPassword').should('have.attr', 'placeholder', 'Digite a Senha...').focus().type("teste123")
        cy.get('#formPlaintextConfirmPassword').should('have.attr', 'placeholder', 'Digite a senha novamente...').focus().type("teste123")
        cy.get('[type="submit"]').should('have.attr', 'value', 'Cadastrar').click()     
    })  

    it("Logar no sistema", () => {
        cy.visit('http://localhost:5173/')
        cy.get('input[type = email]').should('have.attr', 'id', 'formPlaintextEmail').focus().type("teste@cypress")
        cy.get('#formPlaintextPassword').should('have.attr', 'placeholder', 'Digite a Senha...').focus().type("teste123")
        cy.get('[type="submit"]').should('have.attr', 'value', 'Entrar').click() 
    })
    
})