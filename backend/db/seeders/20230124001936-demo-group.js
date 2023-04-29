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
        name: 'Fullstack Projects',
        about: 'We are a small group of fullstack developers who every month clone a website as a group! Whether you want to make connections in the industry, have more projects on your resume, or just want to flex your developer muscles, this is the group for you.',
        type: 'Online',
        private: false,
        city: 'New Castle',
        state: 'DE'
      },
      {
        organizerId: 2,
        name: 'Outdoor Adventure Seekers',
        about: 'Sometimes our lives can be a little much, and sometimes we need a little break from it. Together we will explore the outdoors and find some peace of mind. Whether you want to go on a short hike or go camping over the weekend, this group has an event for you.',
        type: 'In Person',
        private: true,
        city: 'Mauston',
        state: 'WI'
      },
      {
        organizerId: 3,
        name: 'Pizza Lovers',
        about: 'We are a group of people who love eating pizza. That\'s it. Plain and simple. Every week we meetup and find a new pizza place to try out.',
        type: 'In Person',
        private: true,
        city: 'New York',
        state: 'NY'
      },
      {
        organizerId: 3,
        name: 'Cooking Together!',
        about: 'Do you want to hone your cooking skills? Wether you are an amateur or a professional, we find recipies to cook as a group.',
        type: 'In Person',
        private: false,
        city: 'Little Rock',
        state: 'AR'
      },
      {
        organizerId: 4,
        name: 'Communication Skills',
        about: 'A lot of us have a hard time speaking to each other people. Especially after COVID, a lot of us haven\'t spoken to other people for a long time. This group was made for people like us to ease back into our social lives. We have an event every week where we have short seminars giving tips and tricks to improve our self-confidence and our ability to start conversations with others. We also have bi-weekly events where we play games and hang out. Come join us!',
        type: 'Online',
        private: false,
        city: 'Anchorage',
        state: 'AL'
      },
      {
        organizerId: 4,
        name: 'Book Reading Sessions',
        about: 'Do you like books but have no money to buy them? Well on Mondays, Wednesdays, and Fridays at 6pm EST we have a reading of various books.',
        type: 'Online',
        private: true,
        city: 'Newark',
        state: 'DE'
      },
      {
        organizerId: 5,
        name: 'Boardgame Group for Group Boardgames',
        about: 'Do you have a boardgame that you want to play but have no interested friends? Well come on down! We come together four times a month to play those multiplayer boardgames we\'ve always wanted to play!',
        type: 'In Person',
        private: false,
        city: 'Everett',
        state: 'WA'
      },
      {
        organizerId: 8,
        name: 'Volunteer Trash Pickers',
        about: 'We want to make out home a little cleaner. Join us every Saturday to help us clean!',
        type: 'In Person',
        private: false,
        city: 'New York',
        state: 'NY'
      },
      {
        organizerId: 9,
        name: 'Movie Reviewers',
        about: 'We like going to the movies then talking about them. Simple as that! Come around if you like talking about upcoming films!',
        type: 'Online',
        private: false,
        city: 'San Jose',
        state: 'CA'
      },
      {
        organizerId: 10,
        name: 'How to everything',
        about: 'Each week we find a random skill that we want to learn and bring in a guest to walk us through it! Learn new skills, meet new people, and have a good time.',
        type: 'Online',
        private: false,
        city: 'Houston',
        state: 'TX'
      },
      {
        organizerId: 11,
        name: 'Photography Club',
        about: 'A group of people who like sharing pictures with each other. Sometimes we meet up and talk about camera tips and tricks!',
        type: 'Online',
        private: true,
        city: 'Kalispell',
        state: 'MT'
      },
      {
        organizerId: 12,
        name: 'Random Science!',
        about: 'We do science stuff for fun because we can, and sharing them online for anyone to watch!',
        type: 'In Person',
        private: true,
        city: 'Davenport',
        state: 'IA'
      },
      {
        organizerId: 13,
        name: 'Music Makers',
        about: 'Do you like listening to music but your playlist is lacking in songs? Well, here at Music Makers, we meetup every other week and share hidden gems of music with each other!',
        type: 'Online',
        private: false,
        city: 'Cheyenne',
        state: 'WY'
      },
      {
        organizerId: 14,
        name: 'Rush Projects',
        about: 'We like making projects, but specifically those under stressful circumstances! Join our 24 hour rush projects to produce something of middling quality!',
        type: 'Online',
        private: true,
        city: 'Montgomery',
        state: 'AL'
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
