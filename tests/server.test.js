const Server = require('../server');
const Routes = require('../routes');

jest.setTimeout(10000);

describe('Testing the Hapi server', () => {
  it('Should contain correct number of routes', () => {
    expect(Routes.length).toBe(Server.table('localhost')[0].table.length);
  });
  it('Should return 200 status code for sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('Should return the data with the ratings', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
  it('Should return the data with the ratings sorted by Author', (done) => {
    const request = {
      method: 'GET',
      url: '/books',
    };
    Server.inject(request, (response) => {
      expect(Object.keys(response.result.dataWRatingSortedByAuthor).length).toBe(2);
      done();
    });
  });
});
