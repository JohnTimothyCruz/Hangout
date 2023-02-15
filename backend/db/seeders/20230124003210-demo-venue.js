'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Venues';

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
        groupId: 1,
        address: 'Address-One',
        city: 'Onevalley',
        state: 'CA',
        lat: 1,
        lng: 1
      },
      {
        groupId: 2,
        address: 'Address-Two',
        city: 'Twoport',
        state: 'AZ',
        lat: 2,
        lng: 2
      },
      {
        groupId: 3,
        address: 'Address-Three',
        city: 'Threemont',
        state: 'AK',
        lat: 3,
        lng: 3
      },
      {
        groupId: 4,
        address: 'Address-Four',
        city: 'Fourshire',
        state: 'MD',
        lat: 4,
        lng: 4
      },
      {
        groupId: 5,
        address: 'Address-Five',
        city: 'Fiveburg',
        state: 'PA',
        lat: 5,
        lng: 5
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
      groupId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
