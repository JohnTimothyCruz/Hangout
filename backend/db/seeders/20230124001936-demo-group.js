'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Groups';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(options, [
      {
        organizerId: 1,
        name: 'Group-One',
        about: 'We\'re group one.',
        type: 'Online',
        private: true,
        city: 'Onevale',
        state: 'ON'
      },
      {
        organizerId: 2,
        name: 'Group-Two',
        about: 'We\'re group two.',
        type: 'Online',
        private: true,
        city: 'Twovill',
        state: 'TW'
      },
      {
        organizerId: 3,
        name: 'Group-Three',
        about: 'We\'re group three.',
        type: 'In person',
        private: false,
        city: 'Threemouth',
        state: 'TH'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Group-One', 'Group-Two', 'Group-Three'] }
    }, {});
  }
};
