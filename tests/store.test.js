const Server = require('../server');

describe('testing storing', () => {
  it('testing to receive a 201', (done) => {
    const request = {
      method: 'GET',
      url: '/store',
    };
    Server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
});
