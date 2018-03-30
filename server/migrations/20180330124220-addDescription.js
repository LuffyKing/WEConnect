//kk
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Reviews',
      'description',
      Sequelize.STRING
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn(
      'Reviews',
      'description'
    );
  }
};
