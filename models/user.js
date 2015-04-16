"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [4,20],
          msg: 'Password must be between 4 and 20 characters long.'
        }
      },
      allowNull: false
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