const Server = require('../server');

describe('testing /like', () => {
  it('testing with no id to receive a 400', (done) => {
    const request = {
      method: 'GET',
      url: '/like',
    };
    Server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(400);
      done();
    });
  });
});
