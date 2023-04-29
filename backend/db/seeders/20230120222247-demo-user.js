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
        hashedPassword: bcrypt.hashSync('marniepassword'),
        email: 'marnie@user.io',
      },
      {
        firstName: 'Daniel',
        lastName: 'Evans',
        username: 'Dan',
        hashedPassword: bcrypt.hashSync('danielpassword'),
        email: 'daniel@user.io',
      },
      {
        firstName: 'Kelli',
        lastName: 'Philps',
        username: 'Normal Account',
        hashedPassword: bcrypt.hashSync('kellipassword'),
        email: 'kelli@user.io',
      },
      {
        firstName: 'Ellis',
        lastName: 'Ann',
        username: 'Socialperson',
        hashedPassword: bcrypt.hashSync('ellispassword'),
        email: 'ellis@user.io',
      },
      {
        firstName: 'Jack',
        lastName: 'Browne',
        username: 'Jack',
        hashedPassword: bcrypt.hashSync('jackpassword'),
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
        hashedPassword: bcrypt.hashSync('dannypassword'),
        email: 'danny@user.io',
      },
      {
        firstName: 'Alice',
        lastName: 'Ann',
        username: 'Alicann',
        hashedPassword: bcrypt.hashSync('alicepassword'),
        email: 'alice@user.io',
      },
      {
        firstName: 'Dawn',
        lastName: 'Phelps',
        username: 'AnotherUser',
        hashedPassword: bcrypt.hashSync('dawnpassword'),
        email: 'dawn@user.io',
      },
      {
        firstName: 'Twig',
        lastName: 'Turner',
        username: 'Woodsy',
        hashedPassword: bcrypt.hashSync('twigpassword'),
        email: 'twig@user.io',
      },
      {
        firstName: 'Karl',
        lastName: 'Gibb',
        username: 'The_Karl',
        hashedPassword: bcrypt.hashSync('karlpassword'),
        email: 'karl@user.io',
      },
      {
        firstName: 'Robin',
        lastName: 'Glaser',
        username: 'Birdie',
        hashedPassword: bcrypt.hashSync('robinpassword'),
        email: 'robin@user.io',
      },
      {
        firstName: 'Ole',
        lastName: 'Evison',
        username: 'OE3123',
        hashedPassword: bcrypt.hashSync('olepassword'),
        email: 'ole@user.io',
      },
      {
        firstName: 'Ruddy',
        lastName: 'Auther',
        username: 'rooraa',
        hashedPassword: bcrypt.hashSync('ruddypassword'),
        email: 'ruddy@user.io',
      },
      {
        firstName: 'Yvonne',
        lastName: 'Richards',
        username: 'OutdoorsPerson',
        hashedPassword: bcrypt.hashSync('yvonnepassword'),
        email: 'yvonne@user.io',
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
