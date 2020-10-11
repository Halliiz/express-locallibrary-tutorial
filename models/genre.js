module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100],
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `/catalog/genre/${this.id}`;
      },
    },
  });
  return Genre;
};
