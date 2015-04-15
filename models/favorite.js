"use strict";
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {
    RecipeID: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.belongsTo(models.user);
        models.favorite.hasMany(models.drink);
      }
    }
  });
  return favorite;
};