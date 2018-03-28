require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_LOCALHOST,
    dialect: process.env.DB_DEV_DIALECT
  },
  test: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_DATABASE,
    host: process.env.DB_DEV_LOCALHOST,
    dialect: process.env.DB_DEV_DIALECT
  },

  production: {
    use_env_variable: 'DATABASE_URL',
  }
};
