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
        state: 'CA'
      },
      {
        organizerId: 2,
        name: 'Group-Two',
        about: 'We\'re group two.',
        type: 'Online',
        private: true,
        city: 'Twovill',
        state: 'AZ'
      },
      {
        organizerId: 3,
        name: 'Group-Three',
        about: 'We\'re group three.',
        type: 'In person',
        private: false,
        city: 'Threemouth',
        state: 'AK'
      },
      {
        organizerId: 4,
        name: 'Group-Four',
        about: 'We\'re group four.',
        type: 'Online',
        private: true,
        city: 'Fourshire',
        state: 'MD'
      },
      {
        organizerId: 5,
        name: 'Group-Five',
        about: 'We\'re group Five.',
        type: 'In person',
        private: false,
        city: 'Fiveburg',
        state: 'PA'
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
      private: { [Op.in]: [true, false] }
    }, {});
  }
};
