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

      Models.Books.findById(bookID).then((haiKya) => {
        if (haiKya !== null) {
          Models.Books.upsert({
            id: bookID,
            LikeStatus: 'LIKE',
          }).then(() => {
            Models.Books.findById(bookID).then(book => response({
              statusCode: 201,
              result: book,
            }));
          }).catch(err => console.log(err));
        } else {
          response({
            statusCode: 404,
            message: 'ID nai mila',
          });
        }
      });
    },
  },
];
