"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [4,200],
          msg: 'Password must be at least 4 characters long'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(user,options,sendback) {
        bcrypt.hash(user.password, 10, function(err,hash) {
          if (err) { throw err; };
          user.password = hash;
          sendback(null,user);
        })
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.favorite);
        models.user.hasMany(models.shopping);
      }
    }
  });
  return user;
};