describe("Login tests", () => {
    
    it("Admin login", () => {
        // Відкриваємо сторінку логіну
        cy.visit("https://www.edu.goit.global/account/login");

        // Використовуємо команду login
        cy.login("user888@gmail.com", "1234567890");

        // Відкриваємо меню сайту
        cy.get('#open-navigation-menu-mobile').click();

        // Шукаємо кнопку Log out і натискаємо на неї
        cy.contains('Log out').scrollIntoView().should("be.visible").click();

        // Перевіряємо, що повернулися на сторінку логіна
        cy.url().should('include', '/account/login');
    });

    it("User login", () => {
        // Відкриваємо сторінку логіну
        cy.visit("https://www.edu.goit.global/account/login");

        // Використовуємо команду login
        cy.login("testowyqa@qa.team", "QA!automation-1");

        // Відкриваємо меню сайту
        cy.get('#open-navigation-menu-mobile').click();

        // Шукаємо кнопку Log out і натискаємо на неї
        cy.contains('Log out').scrollIntoView().should("be.visible").click();

        // Перевіряємо, що повернулися на сторінку логіна
        cy.url().should('include', '/account/login');
    });
});