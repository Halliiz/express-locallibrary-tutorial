const { Book, BookInstance } = require("../models/sequelize");
const createError = require("http-errors");

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
  try {
    const bookinstance_list = await BookInstance.findAll({
      include: Book,
    });
    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookinstance_list,
    });
  } catch (error) {
    next(error);
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function (req, res, next) {
  try {
    const bookinstanceId = req.params.id;
    const bookinstance = await BookInstance.findByPk(bookinstanceId, {
      include: Book,
    });
    if (bookinstance !== null) {
      res.render("bookinstance_detail", { title: "Book:", bookinstance });
    } else {
      next(createError(404, "Book instance not found"));
    }
  } catch (error) {
    next(error);
  }
};
// Display BookInstance create form on GET.
exports.bookinstance_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};
// Handle BookInstance create on POST.
exports.bookinstance_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};
// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};
// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};
// Display BookInstance update form on GET.
exports.bookinstance_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};
// Handle bookinstance update on POST.
exports.bookinstance_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
