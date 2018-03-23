module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Businesses, {
      foreignKey: 'userid',
      as: 'Businesses'
    });
  };
  return User;
};
