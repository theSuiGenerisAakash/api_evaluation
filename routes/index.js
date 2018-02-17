const books = require('./books');
const storeRatings = require('./storeRatings');
const like = require('./like');

module.exports = [].concat(books, storeRatings, like);
