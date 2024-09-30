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
        '/product/30',
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
        });
    });
  });