const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/read',
    handler: (req, response) => {
      Models.Books.findAll({
        group: ['Books.Author', 'Books.id'],
      }).then((result) => {
        console.log(result);
        response({
          result,
        });
      }).catch(err => console.log(err));
    },
  },
];
