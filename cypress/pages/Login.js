class Login {
    visit() {
        cy.visit("https://www.edu.goit.global/account/login"); // URL сторінки логіна
    }

    fillEmail(email) {
        cy.get('#user_email').type(email); // Введення email
    }

    fillPassword(password) {
        cy.get('#user_password').type(password); // Введення пароля
    }

    submit() {
        cy.get("[type='submit']").click(); // Натискання кнопки submit
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.submit();
    }
}

export default Login;