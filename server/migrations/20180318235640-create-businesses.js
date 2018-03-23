import models from '../models/';

module.exports = {
  up: queryInterface =>
    queryInterface.createTable(models.Businesses.tableName, models.Businesses.attributes),
  down: queryInterface =>
    queryInterface.dropTable(models.Businesses.tableName)

};
