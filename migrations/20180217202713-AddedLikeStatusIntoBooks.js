module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Books', 'LikeStatus', {
      allowNull: true,
      type: Sequelize.ENUM('LIKE', 'DISLIKE'),
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Books', 'LikeStatus')
      .then(() => queryInterface.sequelize.query('DROP TYPE "enum_Books_LikeStatus";')),
};
