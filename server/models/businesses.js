module.exports = (sequelize, DataTypes) => {
  const Businesses = sequelize.define('Businesses', {
    businessName: { allowNull: false, type: DataTypes.STRING },
    telephoneNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    businessid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userid: { type: DataTypes.UUID, allowNull: false },
    city: { allowNull: false, type: DataTypes.STRING },
    country: { allowNull: false, type: DataTypes.STRING },
    industry: { allowNull: false, type: DataTypes.STRING },
    state: { allowNull: false, type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    businessWebsite: { type: DataTypes.STRING }
  });
  Businesses.associate = (models) => {
    Businesses.hasMany(models.Reviews, {
      foreignKey: 'businessid',
      as: 'Reviews'
    });
    Businesses.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
  };
  return Businesses;
};
