'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'GroupImages';

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
        url: 'https://secure-content.meetupstatic.com/images/classic-events/468076005/178x178.jpg?w=178?w=256',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510354190/178x178.jpg?w=178?w=256',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510122636/178x178.jpg?w=178?w=256',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510612418/178x178.jpg?w=178?w=256',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/503340102/178x178.jpg?w=178?w=256',
        preview: false
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
      preview: { [Op.in]: [true, false] }
    }, {});
  }
};
