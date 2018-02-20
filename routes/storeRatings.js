const Models = require('../models');
const request = require('request');

module.exports = [
  {
    method: 'GET',
    path: '/store',
    handler: (req, resp) => {
      let booksData = {};
      // Getting all the books
      new Promise((resolve) => {
        request('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks', (error, res, body) => {
          booksData = JSON.parse(body).books;
          resolve('');
        });
      }).then(() => { // Getting the ratings for those books
        const len = booksData.length;
        const booksDataWRating = [];
        new Promise((resolve) => {
          booksData.forEach((curr) => {
            request(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${curr.id}`, (error, res, body) => {
              const currToChange = curr;
              currToChange.rating = JSON.parse(body).rating;
              booksDataWRating.push(currToChange);
              if (len === booksDataWRating.length) {
                resolve(booksDataWRating);
              }
            });
          });
        }).then((dataWRating) => {
          const promiseArr = [];
          dataWRating.forEach((elem) => {
            promiseArr.push(Models.Books.upsert({
              id: elem.id,
              Name: elem.Name,
              Author: elem.Author,
              Rating: elem.rating,
            }).catch((error) => {
              console.log(error);
            }));
          });
          Promise.all(promiseArr).then(() => {
            resp({
              dataWRating,
              statusCode: 201,
            });
          });
        });
      });
    },
  },
];
