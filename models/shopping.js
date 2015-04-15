"use strict";
module.exports = function(sequelize, DataTypes) {
  var shopping = sequelize.define("shopping", {
    // listName: DataTypes.STRING,
    RecipeID: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    IngredientID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.shopping.belongsTo(models.user);
        models.shopping.hasMany(models.drink);
      }
    }
  });
  return shopping;
};