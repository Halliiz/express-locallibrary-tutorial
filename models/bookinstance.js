const moment = require("moment");

module.exports = (sequelize, Sequelize, DataTypes) => {
  const BookInstance = sequelize.define("BookInstance", {
    imprint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Maintenance",
      validate: {
        isIn: [["Available", "Maintenance", "Loaned", "Reserved"]],
      },
    },
    due_back: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/catalog/bookinstance/${this.id}`;
      },
    },
    due_back_formatted: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.due_back).format("MMMM Do, YYYY");
      },
    },
    due_back_yyyy_mm_dd: {
      type: DataTypes.VIRTUAL,
      get() {
        return moment(this.due_back).format("YYYY-MM-DD");
      },
    },
  });
  return BookInstance;
};
