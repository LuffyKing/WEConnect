module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    firstName: { allowNull: false, type: DataTypes.STRING },
    lastName: { allowNull: false, type: DataTypes.STRING },
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    businessid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    ratingsid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  });
  return Reviews;
};
