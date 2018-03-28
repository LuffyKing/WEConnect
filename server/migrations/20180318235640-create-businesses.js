module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    businessName: { allowNull: false, type: Sequelize.STRING },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    telephoneNumber: { type: Sequelize.STRING, unique: true, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userid: {
      type: Sequelize.UUID,
      allowNull: false
    },
    businessid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    city: { allowNull: false, type: Sequelize.STRING },
    country: { allowNull: false, type: Sequelize.STRING },
    industry: { allowNull: false, type: Sequelize.STRING },
    state: { allowNull: false, type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    businessWebsite: { type: Sequelize.STRING }
  }),
  down: queryInterface => queryInterface.dropTable('Businesses')
};
