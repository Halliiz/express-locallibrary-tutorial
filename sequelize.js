const config = require(__dirname + "/config/mysql.json");
const debug = require("debug")("express-locallibrary-tutorial:sequelize");
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: (msg) => debug(msg),
    dialect: "mysql",
    host: config.host,
    port: config.port,
  }
);

const Genre = require("./models/genre")(sequelize, DataTypes);
const Author = require("./models/author")(sequelize, DataTypes);
const Book = require("./models/book")(sequelize, DataTypes, Model);
const BookInstance = require("./models/bookinstance")(
  sequelize,
  Sequelize,
  DataTypes
);

Author.hasMany(Book);
Book.belongsTo(Author);
Book.belongsToMany(Genre, { through: "bookGenres" });
Book.hasMany(BookInstance);
Genre.belongsToMany(Book, { through: "bookGenres" });
BookInstance.belongsTo(Book);

module.exports = { sequelize, Author, Book, BookInstance, Genre };
