import models from '../models/';

module.exports = {
  up: queryInterface =>
    queryInterface.createTable(models.User.tableName, models.User.attributes),
  down: queryInterface =>
    queryInterface.dropTable(models.User.tableName)

};
