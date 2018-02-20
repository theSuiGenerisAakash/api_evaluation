const Server = require('../server');

describe('testing storing', () => {
  it('testing to receive a 201', (done) => {
    const request = {
      method: 'GET',
      url: '/store',
    };
    Server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(201);
      expect(response.result.dataWRating instanceof Array).toBe(true);
      expect(response.result.dataWRating[0]).toEqual(expect.objectContaining({
        Author: expect.any(String),
        id: expect.any(Number),
        Name: expect.any(String),
        rating: expect.any(Number),
      }));
      done();
    });
  });
});
