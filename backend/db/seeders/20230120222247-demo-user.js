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
        firstName: 'Marnie',
        lastName: 'Anderson',
        username: 'Marnie Anderson',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'marnie@user.io',
      },
      {
        firstName: 'Daniel',
        lastName: 'Evans',
        username: 'Dan',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'daniel@user.io',
      },
      {
        firstName: 'Kelli',
        lastName: 'Philps',
        username: 'Normal Account',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'kelli@user.io',
      },
      {
        firstName: 'Ellis',
        lastName: 'Ann',
        username: 'Socialperson',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'ellis@user.io',
      },
      {
        firstName: 'Jack',
        lastName: 'Browne',
        username: 'Jack',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'jack@user.io',
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo User',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demo@user.io',
      },
      {
        firstName: 'Danny',
        lastName: 'Dan',
        username: 'DD',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'danny@user.io',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.gte]: 0 }
    }, {});
  }
};
