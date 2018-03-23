import models from '../models/';

module.exports = {
  up: queryInterface =>
    queryInterface.createTable(models.Reviews.tableName, models.Businesses.attributes),
  down: queryInterface =>
    queryInterface.dropTable(models.Reviews.tableName)

};
