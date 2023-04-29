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
      },
      {
        groupId: 8,
        address: 'Jacqueline Kennedy Onassis Reservoir',
        city: 'New York',
        state: 'NY',
        lat: 40.78916222697708,
        lng: -73.9655854857704
      },
      {
        groupId: 9,
        address: 'Blanco Urban Venue, 12 N San Pedro St',
        city: 'San Jose',
        state: 'CA',
        lat: 37.34029816918312,
        lng: -121.89354183598168
      },
      {
        groupId: 10,
        address: 'Dry Creek Gatherings & Dry Creek Floral, 30663 Moore Rd',
        city: 'Houston',
        state: 'TX',
        lat: 30.196896884400807,
        lng: -95.64206167355253
      },
      {
        groupId: 11,
        address: '48 Degrees North 2.0 LLC., 15 3rd St E',
        city: 'Kalispell',
        state: 'MT',
        lat: 48.20069731252827,
        lng: -114.3142712630851
      },
      {
        groupId: 12,
        address: 'Duck Creek Stampe Lilac Garden, 3300 E Locust St',
        city: 'Davenport',
        state: 'IA',
        lat: 41.54599362960621,
        lng: -90.53046736113176
      },
      {
        groupId: 13,
        address: 'Little America Hotel & Resort - Cheyenne, 2800 W Lincolnway',
        city: 'Cheyenne',
        state: 'WY',
        lat: 41.12392355794562,
        lng: -104.8580327948249
      },
      {
        groupId: 14,
        address: 'The Station at 5 Points, 400 Mobile St',
        city: 'Montgomery',
        state: 'AL',
        lat: 32.379331974426506,
        lng: -86.31698452202833
      },
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
