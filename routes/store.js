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
          const lenNow = dataWRating.length;
          let i = 0;
          new Promise((resolve) => {
            dataWRating.forEach((elem) => {
              Models.Books.upsert({
                id: elem.id,
                Name: elem.Name,
                Author: elem.Author,
              }).then(() => {
                i += 1; // Checking the number of records written
                if (i === lenNow) { resolve(i); }
              }).catch((error) => {
                resp({
                  data: `Error has occurred => ${error}`,
                  statusCode: 500,
                });
              });
            });
          }).then((yes) => {
            resp({ // Sending it as a response
              yes,
              statusCode: 201,
            });
          });
        });
      });
    },
  },
];
