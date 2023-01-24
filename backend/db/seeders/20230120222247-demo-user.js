'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'One',
        lastName: 'One',
        username: 'User-One',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'one@user.io',
      },
      {
        firstName: 'Two',
        lastName: 'Two',
        username: 'User-Two',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'two@user.io',
      },
      {
        firstName: 'Three',
        lastName: 'Three',
        username: 'User-Three',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'three@user.io',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['User-One', 'User-Two', 'User-Three'] }
    }, {});
  }
};
