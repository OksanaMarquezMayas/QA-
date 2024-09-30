describe('Http API Tests TechHouse', () =>{
    it ('response code should be 200', () => {
        cy.request('https://dev.smarthome-team.store/swagger/index.html').then(response =>{
            const status = response.status;
            assert.equal(200, status);
        })
    })
})
describe('Http API Tests TechHouse', () => {
    const request = {
      url: 'https://dev.smarthome-team.store/swagger/index.html/non-existing-url',
      failOnStatusCode: false
    };
  
    it('response code should be 404', () => {
      cy.request(request).then(response => {
        const status = response.status;
  
        assert.equal(404, status);
      })
    })
  })
  describe('get product test', () => {
    const request = {
      method: 'GET',
      url: 'https://dev.smarthome-team.store/api/Products',
      failOnStatusCode: false
    };
  
    it('response code should be 200', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
      })
    })
  })
  describe('get product test', () => {
    const request = {
      method: 'POST',
      url: 'https://dev.smarthome-team.store/api/Products',
      failOnStatusCode: false
    };
  
    it('response code should be 401', () => {
      cy.request(request).then(response => {
        assert.equal(401, response.status);
      })
    })
  })
  describe('API Login Test', () => {
    const bodyData = {
      email: "volare2008@ukr.net",
      password: "Passw0rd#",
      clientURI: "oksana marquez"
    };
  
    const request = {
      method: 'POST',
      url: 'https://dev.smarthome-team.store/api/Accounts/Login',
      body: bodyData,
      failOnStatusCode: false // Це дозволяє обробляти відповіді з помилками (наприклад, 4xx або 5xx статус)
    };
  
    it('Complex POST Login Test', () => {
      cy.request(request).then(response => {
        // Перевіряємо, що статус відповіді 200
        assert.equal(200, response.status);
  
        // Перевіряємо, що body не співпадає точно з відправленими даними (зазвичай сервер перетворює або додає інші поля)
        assert.notStrictEqual(bodyData, response.body.data);
        
        // Додаткова перевірка на те, чи прийшла правильна структура відповіді
        expect(response.body).to.have.property('token'); // Перевіряємо наявність токену в тілі відповіді (якщо є)
      });
    });
  });
  describe('API Login Header Test', () => {
    const bodyData = {
      email: "volare2008@ukr.net",
      password: "Passw0rd#",
      clientURI: "oksana marquez"
    };
  
    const request = {
      method: 'POST',
      url: 'https://dev.smarthome-team.store/api/Accounts/Login',
      body: bodyData,
      headers: {
        "customHeader": "customValue",
        "Content-Type": "application/json" // Встановлюємо заголовок Content-Type
      },
      failOnStatusCode: false // Це дозволяє обробляти відповіді з помилками
    };
  
    it('test that header set correctly', () => {
      cy.request(request).then(response => {
        // Перевіряємо, що статус відповіді 200
        assert.equal(200, response.status);
  
        // Перевіряємо, що заголовок customHeader передається коректно
        assert.equal(response.requestHeaders.customHeader, "customValue");
        
        // Додатково перевіряємо Content-Type
        assert.equal(response.requestHeaders['Content-Type'], "application/json");
  
        // Логування заголовків для відображення
        console.log(response.requestHeaders);
      });
    });
  });
  describe('API Login User-Agent Test', () => {
    const bodyData = {
      email: "volare2008@ukr.net",
      password: "Passw0rd#",
      clientURI: "oksana marquez"
    };
  
    const request = {
      method: 'POST',
      url: 'https://dev.smarthome-team.store/api/Accounts/Login',
      body: bodyData,
      headers: {
        'user-agent': 'My test user-agent', // Встановлюємо заголовок user-agent
        'Content-Type': 'application/json'  // Встановлюємо Content-Type
      },
      failOnStatusCode: false
    };
  
    it('test that user-agent is set correctly', () => {
      cy.request(request).then(response => {
        // Перевіряємо, що статус відповіді 200
        assert.equal(200, response.status);
  
        // Перевіряємо, що user-agent передається коректно
        assert.equal(response.requestHeaders['user-agent'], 'My test user-agent');
  
        // Логування заголовків для відображення
        console.log(response.requestHeaders);
      });
    });
  });
  describe('API Login Cookie Test', () => {
    const bodyData = {
      email: "volare2008@ukr.net",
      password: "Passw0rd#",
      clientURI: "oksana marquez"
    };
  
    const request = {
      method: 'POST',
      url: 'https://dev.smarthome-team.store/api/Accounts/Login',
      body: bodyData,
      headers: {
        'Cookie': 'sessionToken=abc123',  // Встановлюємо кукі
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    };
  
    it('test send cookie', () => {
      cy.request(request).then(response => {
        // Перевіряємо, що статус відповіді 200
        assert.equal(200, response.status);
  
        // Перевіряємо, що кукі були відправлені коректно
        assert.equal(response.requestHeaders['Cookie'], 'sessionToken=abc123');
  
        // Логування заголовків для відображення
        console.log(response.requestHeaders);
      });
    });
  });
  describe('get product test', () => { 
    const request = {
      method: 'GET',
      url: 'https://dev.smarthome-team.store/api/Products/&75',
      failOnStatusCode: false
    };
  
    it('test complex response body', () => {
      cy.request(request).then(response => {
        // Очікуваний об'єкт відповіді для конкретного продукту
        const expectedBody = {
          "pageIndex": 1,
          "pageSize": 1,
          "count": 53,
          data: [
            {
              productId: 75,
              productName: "\nXiaomi Truclean W10 Pro Wet Dry Vacuum Filter",
              productCode: 10019,
              productPrice: 190,
              productDiscount: 0,
              priceWithDiscount: 190,
              isAvailable: true,
              quantityInStock: 3,
              productUrl: "",
              productDescription: "\"Xiaomi Truclean W10 Pro Wet Dry Vacuum Filter - це високоякісний фільтр, спеціально розроблений для використання в пилососі Xiaomi Truclean W10 Pro...",
              categories: [
                {
                  categoryId: 27,
                  categoryName: "Побутові прилади",
                  url: "household-appliances",
                  isSubCategory: false,
                  products: []
                },
                {
                  categoryId: 29,
                  categoryName: "Аксесуари",
                  url: "accessories",
                  isSubCategory: true,
                  products: []
                },
                {
                  categoryId: 33,
                  categoryName: "Пилососи",
                  url: "vacuum-cleaners",
                  isSubCategory: true,
                  products: []
                }
              ],
              images: [
                {
                  imageId: 10,
                  filename: "19",
                  fileExtension: ".jpg",
                  title: " Xiaomi Truclean W10 Pro Wet Dry Vacuum Filter",
                  imageUrl: "https://dev.smarthome-team.store/images/19.jpg",
                  dateCreated: "2024-08-01T08:48:49.9066635",
                  productId: 75
                }
              ],
              characteristics: [
                {
                  characteristicId: 171,
                  productCharacteristicName: "Модель продукту",
                  productCharacteristicDescription: "B302CN-LX",
                  productId: 75
                },
                {
                  characteristicId: 172,
                  productCharacteristicName: "Фільтрація",
                  productCharacteristicDescription: "PM2.5 та пилу, шерсті домашніх тварин",
                  productId: 75
                },
                {
                  characteristicId: 173,
                  productCharacteristicName: "Розміри, мм",
                  productCharacteristicDescription: "48 x 42 x 34",
                  productId: 75
                },
                {
                  characteristicId: 174,
                  productCharacteristicName: "Вага продукту",
                  productCharacteristicDescription: "прибл. 15 г × 2 (набір фільтрів)",
                  productId: 75
                },
                {
                  characteristicId: 175,
                  productCharacteristicName: "Color",
                  productCharacteristicDescription: "Сірий",
                  productId: 75
                }
              ],
              comments: []
            }
          ]
        };
        
        // Перевіряємо, що тіло відповіді збігається з очікуваним
        assert.deepEqual(response.body, expectedBody);
      });
    });
  });
  describe('get product test', () => { 
    const request = {
      method: 'GET',
      url: 'https://dev.smarthome-team.store/api/Products',
      failOnStatusCode: false
    };
  
    it('test single response body key', () => {
      cy.request(request).then(response => {
        // Приклад перевірки конкретного поля у відповіді, наприклад 'count'
        assert.equal(53, response.body['count']);
  
        // Ви можете перевірити й інші поля, наприклад:
        assert.equal(1, response.body['pageIndex']);
        assert.equal(10, response.body['pageSize']);
      });
    });
  });
  describe('get product test', () => { 
    const request = {
      method: 'GET',
      url: 'https://dev.smarthome-team.store/api/Products',
      failOnStatusCode: false
    };
  
    it('test Set-Cookie header', () => {
      cy.request(request).then(response => {
        // Перевіряємо, що заголовок 'Set-Cookie' існує
        assert.isNotNull(response.headers['set-cookie'], 'Set-Cookie header exists');
  
        // Якщо потрібно перевірити конкретне значення 'Set-Cookie', змініть ключ і значення
        const expectedCookie = '#'; // Очікуване значення cookie
        assert.include(response.headers['set-cookie'], expectedCookie);
      });
    });
  });
  describe('User Info API Test', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sYXJlMjAwOEB1a3IubmV0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidm9sYXJlMjAwOEB1a3IubmV0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mjc1MzIxOTksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMDY7IGh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbTsgYWNjb3VudHMuZ29vZ2xlLmNvbTsgZGV2LnNtYXJ0aG9tZS10ZWFtLnN0b3JlOyBzbWFydGhvbWVkZXYtMDAyLXNpdGUxLmN0ZW1wdXJsLmNvbTsgc21hcnRob21lLXRlYW0uc3RvcmUiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjA2OyBodHRwczovL2FjY291bnRzLmdvb2dsZS5jb207IGFjY291bnRzLmdvb2dsZS5jb207IDQwNzQwODcxODE5Mi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbTsgZGV2LnNtYXJ0aG9tZS10ZWFtLnN0b3JlOyBzbWFydGhvbWVkZXYtMDAyLXNpdGUxLmN0ZW1wdXJsLmNvbTsgc21hcnRob21lLXRlYW0uc3RvcmUifQ.mUPWSm9Aot3CmGPcbRS9VpjDHD0uqmm-XCGlKPCd320';
  
    const request = {
      method: 'GET',
      url: 'https://dev.smarthome-team.store/api/Accounts/user-info',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false // Уникаємо зупинки тесту при невдалому статусі
    };
  
    it('should contain the correct email in response', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status); // Перевірка статусу 200
        assert.equal('volare2008@ukr.net', response.body.email); // Перевірка, що email у відповіді правильний
      });
    });
  });