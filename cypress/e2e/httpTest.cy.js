describe('httpbin tests', () => {
    it('response code should be 200', () => {
      cy.request('https://httpbin.org').then(response => {
        const status = response.status;
  
        assert.equal(200, status);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      url: 'https://httpbin.org/non-existing-url',
      failOnStatusCode: false
    };
  
    it('response code should be 404', () => {
      cy.request(request).then(response => {
        const status = response.status;
  
        assert.equal(404, status);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      failOnStatusCode: false
    };
  
    it('response code should be 200', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      method: 'GET',
      url: 'https://httpbin.org/post',
      failOnStatusCode: false
    };
  
    it('response code should be 405', () => {
      cy.request(request).then(response => {
        assert.equal(405, response.status);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      url: 'https://httpbin.org/get',
      qs: {
        "key": "value"
      },
      failOnStatusCode: false
    };
  
    it('response value should be value', () => {
      cy.request(request).then(response => {
        assert.equal("value", response.body.args.key);
      })
    })
  })
  describe('httpbin tests', () => {
    const bodyData = {
      bodyKey: "bodyValue"
    };
  
    const request = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      body: bodyData,
      failOnStatusCode: false
    };
  
    it('complex post test', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.notStrictEqual(bodyData, response.body.data);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        "customHeader": "customValue"
      },
      failOnStatusCode: false
    };
  
    it('test that header set correctly', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.equal("customValue", response.requestHeaders.customHeader);
      })
    })
  })
  describe('httpbin tests', () => {
    const request = {
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'user-agent': 'My test user-agent'
      },
      failOnStatusCode: false
    };
  
    it('test that user-agent set correctly', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.equal("My test user-agent", response.requestHeaders['user-agent']);
      })
    })
  })
  describe('httpbin tests', () => {

    const request = {
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'Cookie': 'cookieName=cookieValue'
      },
      failOnStatusCode: false
    };
  
    it('test send cookie', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.equal("cookieName=cookieValue", response.requestHeaders['Cookie']);
      })
    })
  })
  it('response code should be 200', () => {
    const request = {
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
    };

    cy.request(request).then(resp => {
      console.log(resp);
      assert.equal("janet.weaver@reqres.in", resp.body.data.email);
    })
  })
  it('response code should be 200', () => {
    const request = {
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
    };

    cy.request(request).then(resp => {
      debugger;

      const body = resp.body;

      const email = body.data.email;

      assert.equal("janet.weaver@reqres.in", email);
    })
  })