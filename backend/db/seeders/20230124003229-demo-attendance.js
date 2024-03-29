'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Attendances';

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
        eventId: 7,
        userId: 1,
        status: 'attending'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'attending'
      },
      {
        eventId: 5,
        userId: 3,
        status: 'attending'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'waitlist'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'pending'
      },
      {
        eventId: 1,
        userId: 2,
        status: 'pending'
      },
      {
        eventId: 1,
        userId: 4,
        status: 'attending'
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
      status: { [Op.in]: ['pending', 'attending', 'waitlist'] }
    }, {});
  }
};
