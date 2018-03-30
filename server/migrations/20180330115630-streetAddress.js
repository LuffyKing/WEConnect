module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Businesses',
      'street',
      Sequelize.STRING
    );
  },

  down: (queryInterface) => {
    queryInterface.removeColumn(
      'Businesses',
      'street'
    );
  }
};
