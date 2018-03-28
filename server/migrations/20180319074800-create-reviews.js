module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    firstName: { allowNull: false, type: Sequelize.STRING },
    lastName: { allowNull: false, type: Sequelize.STRING },
    userid: {
      type: Sequelize.UUID,
      allowNull: false
    },
    ratingsid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    rating: {
      type: Sequelize.INTEGER,
    }
  }),
  down: queryInterface => queryInterface.dropTable('Reviews')
};
