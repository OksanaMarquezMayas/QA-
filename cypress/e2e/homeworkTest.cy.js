//1. Отримання даних на кінець дня
describe('MarketStack API tests', () => {
  const apiKey = '232382c43a66dfb1d951138ba2c80cd7';
  const baseUrl = 'https://api.marketstack.com/v1/';
  it('response code should be 200', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}eod`,
      qs: {
        access_key: apiKey,
        symbols: 'MSFT'
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eql(200);
    });
  });
});
//2. Отримання даних на кінець дня від неіснуючого url
describe('MarketStack API tests', () => {

  const apiKey = '232382c43a66dfb1d951138ba2c80cd7';

  it('response code should be 404', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.marketstack.com/v1/non-existing-url',
      qs: {
        access_key: apiKey,
        symbols: 'MSFT'
      },
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eql(404);
    })
  })
})
//3. Отримання списку тикерів, перевірка часу відповіді
describe('MarketStack API tests', () => {

  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/intraday',
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7',
      symbols: 'MSFT'
    },
    failOnStatusCode: false
  };

  it('response code should be 200', () => {
    cy.request(request).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.duration).to.be.lessThan(2000);
    });
  });
});
//4. Отримаємо запит з неіснуючим методом
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'POST',
    url: 'https://api.marketstack.com/v1/intraday',
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7',
      symbols: 'MSFT'
    },
    failOnStatusCode: false
  };

  it('response code should be 500', () => {
    cy.request(request).then(response => {
      assert.equal(500, response.status);
    });
  });
});
//5. Отримання списку тикерів з неістуючим ключем
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/intraday',
    qs: {
      access_key: '72b5b5b8bcd5c17864c634b4ebb73621',
      symbols: 'MSFT'
    },
    failOnStatusCode: false
  };
  
  it('response code should be 401', () => {
    cy.request(request).then(response => {
        expect(response.status).to.eq(401);
    });
  });
});
//6. Виконання забороненого запиту (не в підписці)
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/eod?symbols=DJI.INDX',
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7',
      symbols: 'DJI.INDX'
    },
    failOnStatusCode: false
  };

  it('response status should be 403', () => {
    cy.request(request).then(response => {
      assert.equal(403, response.status);
    });
  });
});
//7. Отримання даних за період часу, встановлення заголовків
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/eod',
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7',
      symbols: 'APL,MSFT',
      date_from: '2024-02-26',
      date_to: '2024-03-07'
    },
    failOnStatusCode: false
  };

  it('complex post test', () => {
    cy.request(request).then(response => {
      assert.equal(200, response.status);
      expect(response.body).to.have.property('pagination');
      expect(response.body).to.have.property('data');
    });
  });
});
//8.Встановлюємо заголовки, перевіряємо як вони передаються
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/timezones',
    headers: {
      "customHeader": "customValue"
    },
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7'
    },
    failOnStatusCode: false
  };

  it('test that header set correctly', () => {
    cy.request(request).then(response => {
      assert.equal(200, response.status);
      assert.equal("customValue", response.requestHeaders.customHeader);
    });
  });
});
//9. Встановлюємо user-agend
describe('MarketStack API tests', () => {
  
  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/timezones',
    headers: {
      'user-agent': 'My test user-agent'
    },
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7'
    },
    failOnStatusCode: false
  };

  it('test that user-agent set correctly', () => {
    cy.request(request).then(response => {
      assert.equal(200, response.status);
      assert.equal("My test user-agent", response.requestHeaders['user-agent']);
    });
  });
});
//10. Встановлюємо cookie
describe('MarketStack API tests', () => {

  const request = {
    method: 'GET',
    url: 'https://api.marketstack.com/v1/currencies',
    headers: {
      'Cookie': 'cookieName=cookieValue'
    },
    qs: {
      access_key: '232382c43a66dfb1d951138ba2c80cd7'
    },
    failOnStatusCode: false
  };

  it('test send cookie', () => {
    cy.request(request).then(response => {
      assert.equal(200, response.status);
      assert.equal("cookieName=cookieValue", response.requestHeaders['Cookie']);
    });
  });
});
//11. GET запит з рандомними query параметрами
describe('MarketStack API tests', () => {
  it('GET /tickers - Отримання тикера з рандомним параметром limit', () => {
    
    const randomLimit = Math.floor(Math.random() * 50) + 1;

    cy.request({
      method: 'GET',
      url: 'https://api.marketstack.com/v1/currencies',
      qs: { access_key: '232382c43a66dfb1d951138ba2c80cd7', limit: randomLimit },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.length).to.eq(randomLimit);
    });
  });
});
