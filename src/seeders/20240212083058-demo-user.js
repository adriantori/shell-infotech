'use strict';

const path = require('path');
const casual = require('casual');
const bcrypt = require('bcrypt');
const { User } = require(path.join(__dirname, '..', 'models'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = Array.from({ length: 5 }, () => {
      const password = casual.password;
      const hashedPassword = bcrypt.hashSync(password, 10);

      return {
        user_name: casual.username,
        user_email: casual.email,
        user_pass: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
