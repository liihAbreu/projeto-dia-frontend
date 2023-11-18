// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => { 
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/api/users/login',
    body: {
      email: "liliane@testeFinal.com",
      password: "teste123"
    }
  })
  .its('body')
  .then(body => {
    localStorage.setItem("user",{"_id":"65493e61959919a8787653fc","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDkzZTYxOTU5OTE5YTg3ODc2NTNmYyIsImlhdCI6MTY5OTkyNzQxOCwiZXhwIjoxNzAwNTMyMjE4fQ.e-M8g1xQMR4QFjbLSZ32GRfs5dQErD_3mhnJaSBLIzQ","perfil":"administrador","name":"Liliane","idMestre":"65493e61959919a8787653fb"});
  })
});