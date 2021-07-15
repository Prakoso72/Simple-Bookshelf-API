const bookShelf = require('./bookshelf');
const {
  fail400,
  fail404,
  error500,
  success200,
  success201
} = require('./responses');

const addBook = (request, h) => {
  const { payload } = request;

  if (!payload.name) {
    return fail400(h, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (payload.readPage > payload.pageCount) {
    return fail400(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const id = bookShelf.pushBook({ ...payload });

  if (!id) {
    return error500(h, 'Buku gagal ditambahkan');
  }

  return success201(h, 'Buku berhasil ditambahkan', { bookId: id });
};

const getAllBooks = (request, h) => {
  const books = bookShelf.filterBooks(request.query);

  return success200(h, 'success', { books: books });
};

const getABook = (request, h) => {
  const { bookId } = request.params;
  const book = bookShelf.find(book => book.id === bookId);

  if (!book) {
    return fail404(h, 'Buku tidak ditemukan');
  }

  return success200(h, 'success', { book: book });
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { payload } = request;

  if (!payload.name) {
    return fail400(h, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (payload.readPage > payload.pageCount) {
    return fail400(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  if (!bookShelf.pushBook({ ...payload, id: bookId })) {
    return fail404(h, 'Gagal memperbarui buku. Id tidak ditemukan');
  }

  return success200(h, 'Buku berhasil diperbarui');
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = bookShelf.removeBook(bookId);

  if (bookIndex === -1) {
    return fail404(h, 'Buku gagal dihapus. Id tidak ditemukan');
  }

  return success200(h, 'Buku berhasil dihapus');
};

module.exports = { addBook, getAllBooks, getABook, updateBook, deleteBook };
