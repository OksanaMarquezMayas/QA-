describe('SportHub Final Test', () => {
  beforeEach(() => {
    // Відкриття сайту перед кожним тестом
    cy.visit('https://teamchallenge-sport-store-frontend.vercel.app/');
  });

  it('should load the homepage', () => {
    // Перевірка завантаження головної сторінки
    cy.get('header').should('exist');
    cy.get('img[alt="Logo"]').should('be.visible');
  });

  it("logo redirection", () => {
    cy.get('.border-none > img').click();
    cy.get('.absolute > a > .undefined').click();
    cy.contains('Популярні категорії').scrollIntoView().should("be.visible");
  });

  it('should open the menu', () => {
    cy.get('img[alt="menu"]').click();
    cy.contains('span', 'Чоловіки').should('exist');
    cy.contains('span', 'Жінки').should('exist');
    cy.contains('p', 'Мої данні').should('exist');
    cy.contains('p', 'Мої замовлення').should('exist');
    cy.contains('p', 'Вихід').should('exist');
  });

  it('should open the categories navigation', () => {
    cy.get('img[alt="menu"]').click();
    cy.contains('span', 'Чоловіки').click();
    cy.contains('span', 'Кросівки').should('exist');
    cy.contains('span', 'Футболки').should('exist');
    cy.contains('span', 'Шорти').should('exist');
    cy.contains('span', 'Штани').should('exist');
    cy.contains('span', 'Світшоти').should('exist');
  });

  it('should allow navigation to the product page', () => {
    cy.get('img[alt="menu"]').click();
    cy.contains('span', 'Чоловіки').click();
    cy.contains('span', 'Кросівки').click();
    cy.url().should('include', '/sneakers?gender=men&sub_category=sneakers');
    cy.get('img[alt="Кросівки U.S. Polo Assn. ALTENA"]').click();
    cy.get(':nth-child(3) > .flex-wrap').should('exist');

    cy.get('.relative > .text-label')
      .scrollIntoView()
      .should('be.visible')
      .should('exist');

    cy.get('.text-2xl')
      .scrollIntoView()
      .should('be.visible')
      .should('exist');

    cy.contains('Додати до кошика').should('exist');
  });

  it('should allow navigation to the women category', () => {
    cy.get('img[alt="menu"]').click();
    cy.contains('span', 'Жінки').click();
    cy.get(':nth-child(2) > .Navbar_dropdown__odl_k > .container > ul > :nth-child(4) > .relative > .cursor-pointer > span').click();

    cy.url().should('include', '/products/pants?gender=women&sub_category=pants');
  });

  it('should allow searching for products', () => {
    cy.get('.h-16 > :nth-child(2) > .flex > :nth-child(1)').click();
    cy.get('.Search_search_wrapper__LmZXL > :nth-child(1) > .justify-between > .flex > .Search_search_text__xr_Ll')
      .type('Штани{enter}');
    cy.contains('Всі результати').click();
    cy.url().should('include', '/products/pants?category=%D1%88%D1%82%D0%B0%D0%BD%D0%B8');
  });

  it('should handle empty cart gracefully', () => {
    cy.get('.h-16 > :nth-child(2) > .flex > :nth-child(3)').click();
    cy.contains('h1', 'Ваш кошик порожній').should('be.visible');
  });

  it('should allow user to log in', () => {
    cy.get('.h-16 > :nth-child(2) > .flex > :nth-child(2)').click();
    cy.url().should('include', '/auth/login');

    cy.get('form > .mb-2').within(() => {
      cy.get('input[name="email"]').type('atrapaloyaes@gmail.com');
      cy.get('input[name="password"]').type('Passw0rd#');
      cy.contains('Увійти').click();
    });

    cy.contains('a', 'Мої данні').should('be.visible');
  });
});

  