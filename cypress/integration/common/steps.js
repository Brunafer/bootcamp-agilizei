/// <reference types="cypress" />

//passos comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable**',
        status: 200,
        response: {}
        }).as('getNewtable');
    
    cy.route({
        method: 'POST',
        url: '**/api/1/databases/userdetails/collections/newtable**',
        status: 200,
        response: {}
        }).as('postNewtable');  
    
    cy.route({
        method: 'POST',
        url: '**/api/1/databases/userdetails/collections/usertable**',
        status: 200,
        response: {}
        }).as('postUsertable');  

    cy.visit('Register.html');    
	
});