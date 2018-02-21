const Server = require('../server');

describe('testing /dislike', () => {
  it('testing with no id to receive a 400', (done) => {
    const request = {
      method: 'GET',
      url: '/dislike',
    };
    Server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(400);
      done();
    });
  });

  it('testing with valid with no GET', (done) => {
    const request = {
      method: 'POST',
      url: '/dislike/1',
    };
    Server.inject(request, (response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
  it('Testing if a book is successfully disliked', (done) => {
    const request = {
      method: 'GET',
      url: '/dislike/2',
    };
    Server.inject(request, (response) => {
      expect(response.result.result.LikeStatus).toBe('DISLIKE');
      done();
    });
  });
});
