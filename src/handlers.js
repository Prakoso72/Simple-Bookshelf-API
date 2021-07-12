const bookShelf = require('./bookshelf');
// const { nanoid } = require('nanoid');

const addBook = (request, h) => {
  const { payload } = request;

  if (payload.name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    }).code(400);
  }

  if (payload.readPage > payload.pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  // const id = nanoid(16);
  // const finished = payload.pageCount === payload.readPage;
  // const insertedAt = new Date().toISOString();
  // const updatedAt = insertedAt;

  // const newBook = { ...payload, id, finished, insertedAt, updatedAt };

  // bookShelf.push(newBook);

  const newBook = bookShelf.pushBook({ ...payload });

  if (bookShelf.some(book => book === newBook)) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id
      }
    }).code(201);
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  }).code(500);
};

const getAllBooks = (request, h) => {
  const books = bookShelf.filterBooks(request.query);

  return h.response({
    status: 'success',
    data: {
      books: books
    }
  }).code(200);
};

const getABook = (request, h) => {
  const { bookId } = request.params;
  const book = bookShelf.find(book => book.id === bookId);

  if (book === undefined) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book: book
    }
  }).code(200);
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { payload } = request;

  if (payload.name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
  }

  if (payload.readPage > payload.pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
  }

  const bookIndex = bookShelf.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404);
  }

  const updatedAt = new Date().toISOString();
  const finished = payload.readPage === payload.pageCount;

  bookShelf[bookIndex] = {
    ...bookShelf[bookIndex],
    ...payload,
    updatedAt,
    finished
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  }).code(200);
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = bookShelf.removeBook(bookId);

  if (bookIndex === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  }).code(200);
};

module.exports = { addBook, getAllBooks, getABook, updateBook, deleteBook };
