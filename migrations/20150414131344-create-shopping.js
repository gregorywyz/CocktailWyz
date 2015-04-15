"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("shopping", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      RecipeID: {
        type: DataTypes.INTEGER
      },
      Title: {
        type: DataTypes.STRING
      },
      IngredientID: {
        type: DataTypes.INTEGER
      },
      Name: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("shopping").done(done);
  }
};