// cypress/pages/HomePage.js

class HomePage {
    openMenu() {
        cy.get('#open-navigation-menu-mobile').click(); // Відкриття меню
    }

    logout() {
        cy.contains('Log out').scrollIntoView().should("be.visible").click(); // Натискання на Log out
    }

    verifyLogout() {
        cy.url().should('include', '/account/login'); // Перевірка, що ми на сторінці логіна
    }
}

export default HomePage;