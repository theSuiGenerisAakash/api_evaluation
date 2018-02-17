const Models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: '/like/{id?}',
    handler: (req, response) => {
      const bookID = req.params.id ? encodeURIComponent(req.params.id) : 'blech';
      if (bookID === 'blech') {
        response({
          statusCode: 400,
          message: 'No id received',
        });
        return;
      }

      Models.Books.upsert({
        id: bookID,
        LikeStatus: 'LIKE',
      }).then(() => {
        Models.Books.findByID(bookID).then(book => response({
          statusCode: 201,
          result: book,
        }));
      }).catch(err => console.log(err));
    },
  },
];
