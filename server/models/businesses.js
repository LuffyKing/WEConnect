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
    city: { allowNull: false, type: DataTypes.STRING },
    country: { allowNull: false, type: DataTypes.STRING },
    industry: { allowNull: false, type: DataTypes.STRING },
    state: { allowNull: false, type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    businessWebsite: { type: DataTypes.STRING },
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  Businesses.associate = (models) => {
    Businesses.hasMany(models.Reviews, {
      foreignKey: 'businessid'
    });
    Businesses.belongsTo(models.Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
  };
  return Businesses;
};
