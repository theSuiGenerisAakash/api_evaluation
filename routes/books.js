const request = require('request');

module.exports = [
  {
    method: 'GET',
    path: '/books',
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
        }).then((dataWRating) => { // Combining by authors
          const dataWRatingSortedByAuthor = {};
          dataWRating.forEach((elem) => {
            const { Author: author } = elem;
            dataWRatingSortedByAuthor[author] = [];
          });
          dataWRating.forEach((elem) => {
            const { Author: author } = elem;
            dataWRatingSortedByAuthor[author].push(elem);
          });
          resp({ // Sending it as a response
            dataWRatingSortedByAuthor,
          });
        });
      });
    },
  },
];
