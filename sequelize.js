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

  const stephen = await Author.create({
    first_name: "Stephen",
    family_name: "King",
  });
  const fantastique = await Genre.create({ name: "fantastique" });
  const carrie = await Book.create({
    title: "Carrie",
    summary: "Carrie White, dix-sept ans, solitaire, ...",
    isbn: "978-2253096764",
  });
  carrie.setAuthor(stephen);
  carrie.addGenre(fantastique);
  await carrie.save();
})();

module.exports = { Genre, Author, Book };
