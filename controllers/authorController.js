const { Author, Book } = require("../models/sequelize");
const createError = require("http-errors");
const { body, validationResult } = require("express-validator");

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
  res.render("author_form", { title: "Create Author" });
};

// Handle Author create on POST.
exports.author_create_post = [
  body("first_name")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric("fr-FR")
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric("fr-FR")
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array()
       });
    } else {
      const author = Author.build({
        first_name: req.body.first_name,
        family_name: req.body.family_name
      });
      if (req.body.date_of_birth) {
        author.date_of_birth = req.body.date_of_birth;
      }
      if (req.body.date_of_death) {
        author.date_of_death = req.body.date_of_death;
      }
      await author.save();
      res.redirect(author.url);
    }
  },
];
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
