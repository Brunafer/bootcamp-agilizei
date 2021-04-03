/// <reference types="cypress" />

//a biblioteca chance gera dados aleatorios fakes
let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        //rotas
        // GET /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server()
      // cy.route('GET','**/api/1/databases/userdetails/collections/newtable**')
       //.as('getNewtable');
       //cy.route('POST','**/api/1/databases/userdetails/collections/newtable**')
        //.as('postNewtable');
       //cy.route('POST','**/api/1/databases/userdetails/collections/usertable**')
        //.as('postUsertable');

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
        //click
        cy.get('button#submitbtn').click();
        
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
});

//elementos
// input[placeholder="First Name"]
// input[ng-model="LastName"]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value="FeMale"]
// input[type="checkbox"]
// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input#firstpassword
// input#secondpassword