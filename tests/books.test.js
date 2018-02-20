const Server = require('../server');

describe('Testing the /books route', () => {
  it('Should return the data with the ratings sorted by Author', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(request, (response) => {
      const res = response.result;
      const resKey = Object.keys(res)[0];
      expect(typeof resKey).toBe('string');
      expect(typeof res[resKey]).toBe('object');
      expect(typeof Object.keys(res[resKey])[0]).toBe('string');
      expect(res[resKey][Object.keys(res[resKey])[0]] instanceof Array).toBe(true);
      expect((res[resKey][Object.keys(res[resKey])[0]])[0]).toEqual(expect.objectContaining({
        Author: expect.any(String),
        id: expect.any(Number),
        Name: expect.any(String),
        rating: expect.any(Number),
      }));
      done();
    });
  });
});
