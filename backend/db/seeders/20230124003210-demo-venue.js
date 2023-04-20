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
        address: '1612 N Dupont Hwy Unit B',
        city: 'New Castle',
        state: 'DE',
        lat: 39.697328307254956,
        lng: -75.56760174276118
      },
      {
        groupId: 2,
        address: '234 W State St',
        city: 'Mauston',
        state: 'WI',
        lat: 43.79865594797325,
        lng: -90.07840633862791
      },
      {
        groupId: 3,
        address: 'Ramscale Studio, 463 West St',
        city: 'New York',
        state: 'NY',
        lat: 40.741011623723885,
        lng: -74.01001470721657
      },
      {
        groupId: 4,
        address: 'UAPTC - Culinary Arts & Hospitality Management Institute, 13000 I-30 Frontage Rd',
        city: 'Little Rock',
        state: 'AR',
        lat: 35.76577199055715,
        lng: -92.19973250542895
      },
      {
        groupId: 5,
        address: 'The Megan Room, 6591 A St',
        city: 'Anchorage',
        state: 'AL',
        lat: 61.16302826883,
        lng: -149.8824552217287
      },
      {
        groupId: 6,
        address: 'Morris Library, 181 S College Ave',
        city: 'Newark',
        state: 'DE',
        lat: 41.978512124611086,
        lng: -75.25018881075712
      },
      {
        groupId: 7,
        address: 'Mariner Library - Sno-Isle Libraries, 520 128th St. SW, Suites A9 & A10',
        city: 'Everett',
        state: 'WA',
        lat: 48.08410139788176,
        lng: -122.23191628257383
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
      id: { [Op.gte]: 0 }
    }, {});
  }
};
