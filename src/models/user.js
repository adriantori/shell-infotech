'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_pass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
