/// <reference types="cypress" />


let Chance = require('chance');
let chance = new Chance();



When(/^informar meus dados$/, () => {
    //type
    cy.get('input[placeholder="First Name"]').type(chance.first())
    cy.get('input[ng-model="LastName"]').type(chance.last())
    cy.get('input[ng-model^=Email]').type(chance.email())
    cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false }))

    //check --> interage com radio e checbox
    cy.get('input[value="FeMale"]').check();
    cy.get('input[type="checkbox"]').check('Cricket'); //dentro do parenteses coloco o value que quero marcar
    cy.get('input[type="checkbox"]').check('Hockey');
    
    //select -->  select e select 2 (combos)
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('Hong Kong', {force: true});
    cy.get('select#yearbox').select('1996');
    cy.get('select[ng-model^=month]').select('May');
    cy.get('select#daybox').select('14');
    cy.get('input#firstpassword').type('Agilizei@2021');
    cy.get('input#secondpassword').type('Agilizei@2021');

    //attach file -> input file
    cy.get('input#imagesrc').attachFile('foto.jpg');
	
});

When(/^salvar$/, () => {
     //click
     cy.get('button#submitbtn').click();
	
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@getNewtable').then((resNewTable) => {
        //console.log(resNewTable.status)
        //cy.log(resNewTable.status)
        //chai
        expect(resNewTable.status).to.eq(200) 
        })
    cy.wait('@postNewtable').then((resNewTable)=> {
        expect(resNewTable.status).to.eq(200)
    })
    cy.wait('@postUsertable').then((resNewTable)=> {
        expect(resNewTable.status).to.eq(200)
    })
    cy.url().should('contain','WebTable');
    
	
});


