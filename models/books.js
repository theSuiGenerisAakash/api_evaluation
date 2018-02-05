
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    Name: DataTypes.STRING,
    Author: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return Books;
};
