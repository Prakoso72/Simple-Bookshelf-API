// const { nanoid } = require('nanoid');

const bookShelf = [];

bookShelf.filterBooks = ({ name, reading, finished }) => {
  let books = [];

  if (name || reading || finished) {
    if (name !== undefined) {
      books = bookShelf.filter(book => book.name.toUpperCase().includes(name.toUpperCase()));
    }

    if (reading !== undefined) {
      reading = Boolean(Number(reading));

      if (books[0] !== undefined) {
        books = books.filter(book => book.reading === reading);
      } else {
        books = bookShelf.filter(book => book.reading === reading);
      }
    }

    if (finished !== undefined) {
      finished = Boolean(Number(finished));

      if (books[0] !== undefined) {
        books = books.filter(book => book.finished === finished);
      } else {
        books = bookShelf.filter(book => book.finished === finished);
      }
    }
  } else {
    books = bookShelf;
  }

  books = books.map(book => {
    const { id, name, publisher } = book;
    return { id: id, name: name, publisher: publisher };
  });

  return books;
};
// bookShelf.pushBook = ({
//   name,
//   year,
//   author,
//   summary,
//   publisher,
//   pageCount,
//   readPage,
//   reading,
//   id
// }) => {
//   const finished = pageCount === readPage;
//   const updatedAt = new Date().toISOString();
//   let book;

//   if (id === undefined) {
//     const insertedAt = updatedAt;
//     id = nanoid(16);

//     book = {
//       id,
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       finished,
//       reading,
//       insertedAt,
//       updatedAt
//     };

//     bookShelf.push(book);
//   } else {
//     const bookIndex = bookShelf.findIndex(book => book.id === id);

//     book = {
//       ...bookShelf[bookIndex],
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       reading,
//       updatedAt,
//       finished
//     };

//     bookShelf[bookIndex] = book;
//   }

//   return book;
// };

module.exports = bookShelf;
