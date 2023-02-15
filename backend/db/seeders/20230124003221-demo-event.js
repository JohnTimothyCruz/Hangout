'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Events';

module.exports = {
  async up(queryInterface, Sequelize) {
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
        venueId: 1,
        groupId: 1,
        name: 'Event-One',
        description: 'One',
        type: 'In Person',
        capacity: 1,
        price: '1',
        startDate: '2030-12-12 20:00:00',
        endDate: '2031-12-12 20:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Past-Event-One',
        description: 'One',
        type: 'Online',
        capacity: 2,
        price: '50',
        startDate: '2017-12-12 20:00:00',
        endDate: '2018-12-12 20:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Another-Past-Event-One',
        description: 'One again',
        type: 'In Person',
        capacity: 2,
        price: '30',
        startDate: '2019-12-12 20:00:00',
        endDate: '2020-12-12 20:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Another-Another-Past-Event-One',
        description: 'One again again',
        type: 'In Person',
        capacity: 2,
        price: '30',
        startDate: '2020-12-12 20:00:00',
        endDate: '2021-12-12 20:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Event-Two',
        description: 'Two',
        type: 'In Person',
        capacity: 2,
        price: '2',
        startDate: '2030-12-12 20:00:00',
        endDate: '2031-12-12 20:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Event-Three',
        description: 'Three',
        type: 'In Person',
        capacity: 3,
        price: '3',
        startDate: '2030-12-12 20:00:00',
        endDate: '2031-12-12 20:00:00'
      },
      {
        venueId: 4,
        groupId: 4,
        name: 'Event-Four',
        description: 'Four',
        type: 'In Person',
        capacity: 4,
        price: '4',
        startDate: '2030-12-12 20:00:00',
        endDate: '2031-12-12 20:00:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'Event-Five',
        description: 'Five',
        type: 'Online',
        capacity: 5,
        price: '5',
        startDate: '2030-12-12 20:00:00',
        endDate: '2031-12-12 20:00:00'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
