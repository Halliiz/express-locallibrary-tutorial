const { Author, Book } = require("../models/sequelize");
const createError = require("http-errors");

exports.author_list = async function (req, res, next) {
  try {
    const author_list = await Author.findAll({
      order: [["family_name", "ASC"]],
    });
    res.render("author_list", { title: "Author List", author_list });
  } catch (error) {
    next(error);
  }
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res, next) {
  try {
    const authorId = req.params.id;
    const author = await Author.findByPk(authorId, { include: Book });
    if (author !== null) {
      res.render("author_detail", { title: "Author Detail", author });
    } else {
      next(createError(404, "Author not found"));
    }
  } catch (error) {
    next(error);
  }
};

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};
// Handle Author create on POST.
exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};
// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};
// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};
// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};
// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
