
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    Name: DataTypes.STRING,
    Author: DataTypes.STRING,
    Rating: DataTypes.FLOAT,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    LikeStatus: DataTypes.ENUM('LIKE', 'DISLIKE'),
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Books;
};
