function getRandomPhoneNumber() {
  const randomNumber = Math.floor(Math.random() * 90000000) + 10000000; // Generates a random 9-digit number
  return '9' + randomNumber.toString(); // Ensures it starts with '9'
}

function getRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toString();
}

function createEmail() {
  cy.visit('https://www.mailticking.com/');

  cy.get('#newMailbox').click();

  cy.wait(10000); // Consider using cy.wait until the element is visible instead of a fixed wait time
  return cy.get('input[id="active-mail"]').invoke('val').then((emailAddress) => {
      cy.log("Generated email: " + emailAddress);
      return cy.wrap(emailAddress); // Wrap the email address to stay in the Cypress chain
  });
}

function confirmEmail() {
  cy.visit('https://www.mailticking.com/');
  // Wait for the emails to load
  cy.get('#message-list').should('be.visible');

  cy.wait(10000);// Get the first row in the table and find the first anchor tag
  cy.get('#message-list tr:first a').first().then(($a) => {
      const relativeHref = $a.attr('href'); // Extract the href attribute

      // Construct the full URL using the base URL
      const fullUrl = `https://www.mailticking.com/${relativeHref}`;

      // Log the full URL for debugging
      cy.log('The full email URL is: ' + fullUrl);

      // Visit the constructed full URL
      cy.visit(fullUrl); // Visits the full URL
  });

  cy.get('.mail-content a') // Locate the first anchor tag within the mail-content div
      .invoke('attr', 'href')  // Get the href attribute
      .then((href) => {
          cy.log('Found href:', href); // Log the href for debugging
          cy.visit(href); // Visit the extracted link
      });
}

describe('Registration Form Test', () => {
  it('fills out the registration form and submits it', () => {
      const emailLocal = "999"
      createEmail().then((email) => {
          const randomPhoneNumber = getRandomPhoneNumber();
          const randomString = getRandomString(8);

          cy.origin('https://teamchallenge-sport-store-frontend.vercel.app', { args: { email, randomPhoneNumber, randomString } }, ({ email, randomPhoneNumber, randomString }) => {
              cy.visit('/auth/signup');
              emailLocal = email
              // Fill in the form fields
              cy.get('input[name="name"]').type(randomString);
              cy.get('input[name="surname"]').type(randomString);
              cy.get('input[name="patronymic"]').type(randomString);
              cy.get('input[name="phone"]').type(randomPhoneNumber);
              cy.get('input[name="email"]').type(email); // This line may cause a timeout

              // Wait for password field to be visible before typing
              cy.get('input[name="password"]').should('be.visible').type('Password123');
              cy.get('input[name="repeatPassword"]').should('be.visible').type('Password123');
              cy.get('button[type="submit"]').click();
          });

          // Call confirmEmail function to check email
          confirmEmail();

          cy.origin('https://teamchallenge-sport-store-frontend.vercel.app/auth/login',() =>{
          
          cy.get('button.bg-blue').click();
          cy.get('input[name="email"]').should('be.visible').type(emailLocal);
          cy.get('input[name="password"]').should('be.visible').type('Password123');
          cy.get('button[type="submit"]').click(); // Click the login button if applicable
          })
         
      });
  });
});
describe("Verify logo", () => {
    
    it("logo redirection", () => {
        // Відкриваємо сторінку логіну
        cy.visit("https://teamchallenge-sport-store-frontend.vercel.app/");

          // Шукаємо меню та клікамо на меню
          cy.get('.border-none > img').click();
          // Шукаємо лого та клікаємо
          cy.get('.absolute > a > .undefined').click();
          // Перевіряємо чи знаходимось на головній сторінці
          cy.contains ('Популярні категорії').scrollIntoView().should("be.visible");
    });
});
describe('Get Links from Swiper Slides', () => {
    it('Check if links from Galery is correct as given array', () => {
      cy.visit('https://teamchallenge-sport-store-frontend.vercel.app/');
  
      // Define an array of expected links
      const expectedLinks = [
        '/product/103',
        '/product/30',
        '/product/95',
      ];
  
      cy.get('section.w-full') // Selects all sections with the class "w-full"
        .first() // Get the first section
        .find('.swiper-wrapper') // Finds the swiper-wrapper within that section
        .within(() => {
          const actualLinks = []; // Array to store actual links
  
          cy.get('.swiper-slide') // Selects all swiper-slide elements within the first swiper-wrapper
            .each(($slide) => {
              cy.wrap($slide)
                .find('a') // Finds the <a> element within the slide
                .then(($link) => {
                  const link = $link.attr('href'); // Get the href attribute
                  actualLinks.push(link); // Add the link to the actual links array
                  cy.log("The link we are looking for: " + link); // Log the link to the Cypress console
                  cy.request(link).then((response) => {
                    expect(response.status).to.eq(200); // Status should be 200 OK
                  });
                });
            }).then(() => {
              // After processing all links, compare actualLinks with expectedLinks
              expect(actualLinks).to.deep.equal(expectedLinks);
            });
            it('test duration', () => {
                cy.request(request).then(response => {
                  assert.isTrue(response.duration <= 150)
                })
              })
              
        });
    });
  });

/*describe('User Registration Test with Ukrainian Names', () => {
  let email = '';
  let confirmationUrl = '';

  // Функція для генерації випадкових букв (тільки українські букви)
  function getRandomString(length) {
      const characters = 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ';
      let result = '';
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
  }

  // Функція для генерації випадкового числа
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функція для генерації випадкового паролю (англійські літери та цифри)
  function getRandomPassword(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
  }

  // Генерація випадкових даних для реєстрації
  const randomFirstName = getRandomString(6);  // Ім'я з 6 букв
  const randomLastName = getRandomString(8);   // Прізвище з 8 букв
  const randomPatronymic = getRandomString(10); // По батькові з 10 букв
  const randomPhone = getRandomInt(100000000, 999999999);
  const randomPassword = getRandomPassword(10); // Пароль з 10 символів

  it('Registers a new user with only letters in names, confirms email and checks password confirmation', () => {
      // Використання cy.origin для виконання команд на різних доменах
      function createEmail() {
          // 1. Перейти на сайт тимчасової пошти і згенерувати нову пошту
          cy.visit('https://www.guerrillamail.com/'); 
          cy.get('#email-widget').invoke('text').then((mailText) => {
              email = mailText.trim(); // Зберегти згенеровану пошту
          });
      };
      createEmail().then(() => {
      // Переходимо на домен сторінки реєстрації
      cy.origin('https://teamchallenge-sport-store-frontend.vercel.app/auth/signup',() =>{


          // 3. Заповнити форму реєстрації
          cy.get('input[name="name"]').type(randomFirstName);
                cy.get('input[name="surname"]').type(randomLastName);
                cy.get('input[name="patronymic"]').type(randomPatronymic);
                cy.get('input[name="phone"]').type(randomPhone);
                cy.get('input[name="email"]').type(email); // This line may cause a timeout

                // Wait for password field to be visible before typing
                cy.get('input[name="password"]').should('be.visible').type('Password123');
                cy.get('input[name="repeatPassword"]').should('be.visible').type('Password123');
                cy.get('button[type="submit"]').click();
      })});

      // Використання cy.origin для повернення на домен пошти
      cy.origin('https://www.guerrillamail.com', () => {
          // 4. Повернутись на сайт тимчасової пошти і перевірити лист
          cy.visit('https://www.guerrillamail.com/');
          cy.wait(5000); // Зачекати на новий лист (можливо змінити на інший підхід)
          
          cy.get('.email-list-item').should('have.length.greaterThan', 0); // Перевірити наявність листа
          cy.get('.email-list-item').first().click(); // Клікнути на перший (новий) лист

          // 5. Витягнути лінк для підтвердження реєстрації
          cy.get('.email-body').invoke('text').then((emailText) => {
              const regex = /(https?:\/\/[^\s]+)/g;
              confirmationUrl = emailText.match(regex)[0]; // Зберегти лінк
          });
      });

      // Використання cy.origin для переходу за лінком підтвердження
      cy.origin(confirmationUrl, () => {
          // 6. Перейти за лінком з листа і підтвердити реєстрацію
          cy.visit(confirmationUrl);
          cy.contains('Ви успішно зареєстровані').should('be.visible'); // Перевірити повідомлення
      });
  });
});*/