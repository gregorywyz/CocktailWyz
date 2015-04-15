"use strict";
module.exports = function(sequelize, DataTypes) {
  var drink = sequelize.define("drink", {
    RecipeID: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    IngredientID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    favoriteId: DataTypes.INTEGER,
    shoppingId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.drink.belongsTo(models.favorite);
        models.drink.belongsTo(models.shopping);
      }
    }
  });
  return drink;
};