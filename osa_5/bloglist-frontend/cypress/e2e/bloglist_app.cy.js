describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
    const user = {
      name: 'Masa Bäri',
      username: 'mbäri',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mbäri')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Masa Bäri logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mbäri')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Masa Bäri logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mbäri', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('[data-testid="title-input"]').type('Blog Title by Cypress')
      cy.get('[data-testid="author-input"]').type('Cypress')
      cy.get('[data-testid="url-input"]').type('http://test.url.by.cypress.test')
      cy.get('[data-testid="create-blog-button"]').click()
      cy.contains('Blog Title by Cypress Cypress')
      cy.get('.info')
        .should('contain', 'a new blog Blog Title by Cypress by Cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Cypress', url: 'http://test.cypress/blog_1' })
        cy.createBlog({ title: 'second blog', author: 'Cypress', url: 'http://test.cypress/blog_2' })
        cy.createBlog({ title: 'third blog', author: 'Cypress', url: 'http://test.cypress/blog_3' })
      })

      it('a blog can be liked', function () {
        cy.get('[data-cy="first blog"]')
          .find('button')
          .click()
        cy.get('[data-testid="likes-container"]').contains(0)
        cy.get('[data-testid="like-button"]').click()
        cy.get('[data-testid="likes-container"]').contains(1)
      })

      it('a blog can be deleted by the user that created it(also can see the remove button)', function () {
        cy.contains('first blog Cypress')
        cy.get('[data-cy="first blog"]')
          .find('button')
          .click()
        cy.get('[data-cy="remove-button"]').click()
        cy.get('html').should('not.contain', 'first blog Cypress')
        cy.get('.info')
          .should('contain', 'first blog by Cypress')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('user that hasnt created the blog doesnt see the remove button', function () {
        const user = {
          name: 'Toinen Käyttis',
          username: 'toinen',
          password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.login({ username: 'toinen', password: 'salainen' })
        cy.get('[data-cy="first blog"]')
          .find('button')
          .click()
        cy.get('[data-cy="remove-button"]').should('not.exist')
      })

      it('blogs are ordered by the number of likes', function () {
        cy.get('.blog-container').eq(0).should('contain', 'first blog Cypress')
        cy.get('.blog-container').eq(1).should('contain', 'second blog Cypress')
        cy.get('.blog-container').eq(2).should('contain', 'third blog Cypress')

        cy.get('[data-cy="third blog"]')
          .find('button')
          .click()
          .get('[data-testid="like-button"]').click()

        cy.get('.blog-container').eq(0).should('contain', 'third blog Cypress')
        cy.get('.blog-container').eq(1).should('contain', 'first blog Cypress')
        cy.get('.blog-container').eq(2).should('contain', 'second blog Cypress')
      })
    })
  })
})