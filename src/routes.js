const {
  addBook,
  getABook,
  getAllBooks,
  updateBook,
  deleteBook
} = require('./handlers');

module.exports = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getABook
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response({
        status: 'fail',
        message: 'Page Not Found!'
      }).code(404);
    }
  }
];
