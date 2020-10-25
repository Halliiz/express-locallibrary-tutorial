const { Author, Book, BookInstance, Genre } = require("../models/sequelize");
const createError = require("http-errors");

exports.index = async function (req, res, next) {
  try {
    const book_count_promise = Book.count();
    const bookinstance_count_promise = BookInstance.count();
    const bookinstance_available_count_promise = BookInstance.count({
      where: {
        status: "Available",
      },
    });
    const author_count_promise = Author.count();
    const genre_count_promise = Genre.count();

    const results = await Promise.all([
      book_count_promise,
      bookinstance_count_promise,
      bookinstance_available_count_promise,
      author_count_promise,
      genre_count_promise,
    ]);
    res.render("index", {
      title: "Local Library Home",
      data: {
        book_count: results[0],
        book_instance_count: results[1],
        book_instance_available_count: results[2],
        author_count: results[3],
        genre_count: results[4],
      },
    });
  } catch (error) {
    next(error);
  }
};

// Display list of all books.
exports.book_list = async function (req, res, next) {
  try {
    const book_list = await Book.findAll({
      include: Author,
    });
    res.render("book_list", { title: "Book List", book_list });
  } catch (error) {
    next(error);
  }
};

// Display detail page for a specific book.
exports.book_detail = async function (req, res, next) {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId, {
      include: [Author, Genre, BookInstance],
    });
    if (book !== null) {
      res.render("book_detail", {title: "Book Detail", book});
    } else {
      next(createError(404, "Book not found"));
    }
  } catch (error) {
    next(error);
  }
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};
// Handle book create on POST.
exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};
// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};
// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};
// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};
// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
