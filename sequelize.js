const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "locallibrary",
  "locallibrary",
  "locallibrary_secret",
  {
    dialect: "mysql",
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  } finally {
    await sequelize.close();
    console.log("Connection closed");
  }
})();
