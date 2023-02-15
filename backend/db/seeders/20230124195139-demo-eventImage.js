'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'EventImages';

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
        eventId: 1,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510263871/222x125.webp',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510247037/222x125.webp',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/509717215/222x125.webp',
        preview: false
      },
      {
        eventId: 4,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510456115/222x125.webp',
        preview: true
      }, {
        eventId: 5,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510511628/222x125.webp',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/507304133/222x125.webp',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://secure-content.meetupstatic.com/images/classic-events/510479159/222x125.webp',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://secure.meetupstatic.com/next/images/fallbacks/group-cover-15-wide.webp',
        preview: false
      },
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
      preview: { [Op.in]: [true, false] }
    }, {});
  }
};
