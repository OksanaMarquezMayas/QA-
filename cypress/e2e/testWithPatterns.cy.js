import Login from '../pages/Login'; // Імпорт класу Login
import HomePage from '../pages/HomePage'; // Імпорт класу HomePage

describe("Login tests", () => {
    
    const loginPage = new Login();
    const homePage = new HomePage();
    
    it("Admin login", () => {
        // Відкриваємо сторінку логіна
        loginPage.visit();

        // Використовуємо метод логіна
        loginPage.login("user888@gmail.com", "1234567890");

        // Відкриваємо меню сайту і робимо Log out
        homePage.openMenu();
        homePage.logout();

        // Перевіряємо, що ми на сторінці логіна
        homePage.verifyLogout();
    });

    it("User login", () => {
        // Відкриваємо сторінку логіна
        loginPage.visit();

        // Використовуємо метод логіна
        loginPage.login("testowyqa@qa.team", "QA!automation-1");

        // Відкриваємо меню сайту і робимо Log out
        homePage.openMenu();
        homePage.logout();

        // Перевіряємо, що ми на сторінці логіна
        homePage.verifyLogout();
    });
});