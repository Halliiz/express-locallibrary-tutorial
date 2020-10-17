const config = require(__dirname + "/config/mysql.json");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: "mysql",
    host: config.host,
    port: config.port,
  }
);

const Genre = require("./models/genre")(sequelize, DataTypes);
const Author = require("./models/author")(sequelize, DataTypes);
const Book = require("./models/book")(sequelize, DataTypes);
const BookInstance = require("./models/bookinstance")(
  sequelize,
  Sequelize,
  DataTypes
);

Author.hasMany(Book);
Book.belongsTo(Author);
Book.belongsToMany(Genre, { through: "BookGenres" });
Book.hasMany(BookInstance);
Genre.belongsToMany(Book, { through: "BookGenres" });
BookInstance.belongsTo(Book);

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected and tables created");
  } catch (error) {
    console.error(
      "Error while connecting to the database and creating schema: ",
      error
    );
  }
})();

module.exports = { Genre, Author, Book, BookInstance };
