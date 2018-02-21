const books = require('./books');
const storeRatings = require('./storeRatings');
const like = require('./like');
const dislike = require('./dislike');
const read = require('./read');

module.exports = [].concat(books, storeRatings, like, dislike, read);
