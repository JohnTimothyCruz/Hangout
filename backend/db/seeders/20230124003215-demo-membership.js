'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Memberships';

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
        userId: 1,
        groupId: 2,
        status: 'pending'
      },
      {
        userId: 1,
        groupId: 3,
        status: 'pending'
      },
      {
        userId: 1,
        groupId: 4,
        status: 'pending'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 3,
        groupId: 5,
        status: 'co-host'
      },
      {
        userId: 4,
        groupId: 7,
        status: 'pending'
      },
      {
        userId: 7,
        groupId: 1,
        status: 'member'
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
      status: { [Op.in]: ['pending', 'member', 'co-host'] }
    }, {});
  }
};
