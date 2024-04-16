
//Register/signUp user and after succes visit loginpage to login
describe('working with fixture data to signup', ()=>{

  it('signup through login1 data and tries to signup', ()=>{
    cy.visit('/register')
    cy.fixture('signup1.json').then((data)=>{

          cy.get('[data-cy="firstName"]').type(data.firstName)
          cy.get('[data-cy="lastName"]').type(data.lastName)
          cy.get('[data-cy="email"]').type(data.email)
          cy.get('[data-cy="password"]').type(data.password)

          //after signup to login page and login
          cy.get('[data-cy="sign-btn"]').click().then(el=>{
          cy.visit('/auth/login')

          })

    })
})
})



//registering with fixed data correct details and wrong details
describe('working with fixture data to login', ()=>{

  it('iterates through login2 data and tries to login', ()=>{
      cy.visit('/auth/login')

      cy.fixture('login2.json').then((dataarray)=>{
          dataarray.forEach((data:{email: string, password: string})=>{
              cy.get('[data-cy="email"]').type(data.email)
              cy.get('[data-cy="password"]').type(data.password)

              if(data.email == 'compgodwin@gmail.com' && data.password == '123456'){
                  cy.get('[data-cy="login-btn"]').click().then(el=>{
                  cy.location('pathname').should('equal', '/admin')
                  cy.get('[data-cy="logout-link"]').click()
                  cy.visit('/auth/login')
                  })
              }
              else if(data.email == 'compgodwin@gmail.com' && data.password! == '123456'){
                cy.get('[data-cy="login-btn"]').click()
                cy.contains('Incorrect password')
            }
          })
      })
  })

})



 //intercepting
describe('Request without hitting backend', ()=>{
  // beforeEach(()=>{
  //     cy.visit( '/auth/login') })

  it('should handle login port request', ()=>{
      cy.intercept('POST', 'http://localhost:4000/auth/login', {
          body:{
              message: "Logged in successfully"
          }
      }).as('loginRequest')

      cy.get('[data-cy="login-btn"]').click()

      cy.wait('@loginRequest').then(interception =>{
          expect( interception.request.body).to.exist;
1
          cy.get('.sucessMsg').should('contain', 'Logged In Successfully')
      })
   })

})


