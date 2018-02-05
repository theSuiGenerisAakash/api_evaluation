const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: (request, response) => {
      response({
        statusCode: 200,
      });
    },
  },
];
