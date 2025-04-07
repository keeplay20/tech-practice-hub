const bookList = [
  { bookName: "ABCD", genre: "Fantasy" },
  { bookName: "ABCDE", genre: "Fantasy" },
  { bookName: "XYZ", genre: "Self-Help" },
];

const getBookListByGenre = (bookList, genre) =>
  bookList.filter((book) => book.genre === genre).map((book) => book.bookName);

console.log(getBookListByGenre(bookList, "Fantasy"));
