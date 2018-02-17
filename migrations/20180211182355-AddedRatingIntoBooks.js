

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Books', 'Rating', {
      type: Sequelize.FLOAT,
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Books', 'Rating');
  },
};
