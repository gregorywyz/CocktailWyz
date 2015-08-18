"use strict";

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  // define user model and validations before create
  var user = sequelize.define("user", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'You must not leave the name field empty.'
        }
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'You must provide a valid email.'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [4,20],
          msg: 'Password must be between 4 and 20 characters long.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(user,options,sendback) {
      // use bcrypt to secure password
        bcrypt.hash(user.password, 10, function(err,hash) {
          if (err) { throw err; };
          user.password = hash;
          sendback(null,user);
        })
      }
    },
    classMethods: {
      associate: function(models) {
        // associations are defined here
        models.user.hasMany(models.favorite);
        models.user.hasMany(models.shopping);
      }
    }
  });
  return user;
};