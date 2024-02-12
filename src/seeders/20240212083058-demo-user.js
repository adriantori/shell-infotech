// src/seeders/20220212123456-demo-users.js

'use strict';

const path = require('path');
const casual = require('casual');
const { User } = require(path.join(__dirname, '..', 'models'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = Array.from({ length: 5 }, () => ({
      username: casual.username,
      email: casual.email,
      password: casual.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
