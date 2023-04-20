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
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/250px-YouTube_Logo_2017.svg.png',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Reddit_icon.svg/150px-Reddit_icon.svg.png',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/LinkedIn_2021.svg/200px-LinkedIn_2021.svg.png',
        preview: false
      },
      {
        eventId: 4,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/MDN_Web_Docs_logo.svg/220px-MDN_Web_Docs_logo.svg.png',
        preview: true
      }, {
        eventId: 5,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/220px-Spotify_logo_with_text.svg.png',
        preview: false
      },
      {
        eventId: 6,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kickstarter_logo_2019.svg/220px-Kickstarter_logo_2019.svg.png',
        preview: false
      },
      {
        eventId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg/300px-Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
        preview: false
      },
      {
        eventId: 8,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg/220px-Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg',
        preview: false
      },
      {
        eventId: 9,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/220px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Black_Forest_gateau.jpg/250px-Black_Forest_gateau.jpg',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/556712d9bf0f4cb2a916cc810687d52b/files/blog-drafts/talking.png',
        preview: false
      },
      {
        eventId: 12,
        url: 'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/556712d9bf0f4cb2a916cc810687d52b/files/blog-drafts/talking.png',
        preview: false
      },
      {
        eventId: 13,
        url: 'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/556712d9bf0f4cb2a916cc810687d52b/files/blog-drafts/talking.png',
        preview: true
      }, {
        eventId: 14,
        url: 'https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/556712d9bf0f4cb2a916cc810687d52b/files/blog-drafts/talking.png',
        preview: false
      },
      {
        eventId: 15,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvbHgztZzrbHP-lwbZrRXIwChwUJh9g9QNxA&usqp=CAU',
        preview: false
      },
      {
        eventId: 16,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWMwFgcYFDCq46r9UIxm1sfq3a1P3ifVbxQ&usqp=CAU',
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
