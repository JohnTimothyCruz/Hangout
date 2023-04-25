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
        name: 'Cloning Youtube',
        description: 'Welcome to the first event of our group! This month, we will be working on cloning the famous video sharing platform Youtube.com! We will decide on the technologies used on the first day of the event. Hope you can be there!',
        type: 'Online',
        capacity: 10,
        price: '5',
        startDate: '2020-9-1 17:00:00',
        endDate: '2020-10-1 17:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Cloning Reddit',
        description: 'Welcome to the second event of our group! This month, we will be working on cloning the infamous social media platform Reddit.com! We will decide on the technologies used on the first day of the event. See you there!',
        type: 'Online',
        capacity: 10,
        price: '5',
        startDate: '2020-11-1 17:00:00',
        endDate: '2020-12-1 17:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Cloning LinkedIn',
        description: 'Welcome to the third event of our group! This month, we will be working on cloning the job searching site LinkedIn.com! We will decide on the technologies used on the first day of the event. Come if you can!',
        type: 'Online',
        capacity: 10,
        price: '5',
        startDate: '2021-1-1 17:00:00',
        endDate: '2021-2-1 17:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Cloning Developer Mozilla',
        description: 'Welcome to the fourth event of our group! This month, we will be working on cloning the wonderful coding documentation site Developer.Mozilla.org! We will decide on the technologies used on the first day of the event. See you there!',
        type: 'Online',
        capacity: 10,
        price: '5',
        startDate: '2022-3-1 16:00:00',
        endDate: '2022-4-1 16:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Cloning Spotify',
        description: 'Welcome to the fifth event of our group! This month, we will be working on cloning the music site Spotify.com! We will decide on the technologies used on the first day of the event. See you on the first!',
        type: 'Online',
        capacity: 10,
        price: '2',
        startDate: '2023-8-1 17:00:00',
        endDate: '2023-9-1 17:00:00'
      },
      {
        venueId: 1,
        groupId: 1,
        name: 'Cloning KickStarter',
        description: 'Sorry for the break, but we are starting up a new project! This month, we will be working on cloning a famous site used to support upcoming projects, Kickstarter.com! Again, we will decide what technologies to use on the first day of the event. Hope you can make it!',
        type: 'Online',
        capacity: 15,
        price: '2',
        startDate: '2023-4-1 16:00:00',
        endDate: '2023-5-1 16:00:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'First Hiking Event!',
        description: 'Need to stretch those legs? Well, you\'ll have plenty of time to do that on this short trail in Riverside Park. This will be a shorter hike since this is the first event, we\'ll meet at the venue, then make our way to the trail.',
        type: 'In Person',
        capacity: 15,
        price: '0',
        startDate: '2023-3-4 11:00:00',
        endDate: '2023-3-4 12:30:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'First Camping Event!',
        description: 'After the successful first event, we decided to have a longer trip! Just for a day, we will be in Buckhorn State Park. Again, we will meet at the venue then make our way to the camp site. Bring food and drinks if you can!',
        type: 'In Person',
        capacity: 25,
        price: '0',
        startDate: '2023-4-24 9:00:00',
        endDate: '2023-4-24 19:00:00'
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Trying out Rubirosa\'s pizza',
        description: 'A little spot that serves pretty good pizza. Not too too expensive. Meetup outside the building then five mins before the reservation.',
        type: 'In Person',
        capacity: 8,
        price: '10',
        startDate: '2023-7-4 20:00:00',
        endDate: '2023-7-4 21:45:00'
      },
      {
        venueId: 4,
        groupId: 4,
        name: 'Black forest cakes',
        description: 'Welcome to the very first event of Cooking Together! We will start out simple with a black forest cake. Ingredients and tools will be provided, and yes you can eat the cakes afterwards. Hope you like chocolate!',
        type: 'In Person',
        capacity: 6,
        price: '0',
        startDate: '2023-3-24 15:10:00',
        endDate: '2023-3-24 17:40:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'How to start a conversation',
        description: 'It\'s been a while since some of us have talked to others, and that\'s fine. We have a very outgoing speaker to help us out with taking those first steps out of our comfort zone. We will meet in person, but a zoom link will be available for those who\'d prefer not to attend in person (message group organizer). No pressure and no cold calls!',
        type: 'In Person',
        capacity: 30,
        price: '0',
        startDate: '2023-3-11 18:00:00',
        endDate: '2023-3-11 19:25:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'How to improvise',
        description: 'Many of us go into a conversation with a topic in mind. But when the conversation shifts away from it, what do we do? Well, Gilbert Daniels will be the speaker this time, and he will explain how to be ready for ANY conversation thrown your way. We will meet in person, but a zoom link will be available for those who\'d prefer not to attend in person (message group organizer). No pressure and no cold calls!',
        type: 'In Person',
        capacity: 30,
        price: '0',
        startDate: '2023-3-18 18:00:00',
        endDate: '2023-3-18 19:25:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'How to be less critical about yourself',
        description: 'A lot of us who aren\'t fond of talking to others tend to walk out of conversations berating ourselves for what if\'s and should haves. Gilbert Daniels returns to talk about why that kind of attitude is not ideal, and how and why we should quiet that mean voice in our head. We will meet in person, but a zoom link will be available for those who\'d prefer not to attend in person (message group organizer). No pressure and no cold calls!',
        type: 'In Person',
        capacity: 30,
        price: '0',
        startDate: '2023-3-25 18:00:00',
        endDate: '2023-3-25 19:25:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: '"Tell me about yourself"',
        description: 'What do we do when people ask about us? We\'ve all strugle with feeling a little boring. Some of us may have thought "There\'s not much to me though". Well, Gilbert Daniels is here this week to show that you are much more interesting that you think you are, and how to talk about yourself. We will meet in person, but a zoom link will be available for those who\'d prefer not to attend in person (message group organizer). No pressure and no cold calls!',
        type: 'In Person',
        capacity: 30,
        price: '0',
        startDate: '2023-7-8 18:00:00',
        endDate: '2023-8-8 19:25:00'
      },
      {
        venueId: 6,
        groupId: 6,
        name: 'Eventide',
        description: 'In this event, we will be reading a few chapters of Eventinde by Laura and Tracy Hickman. Come and listen for however much time you can spare!',
        type: 'Online',
        capacity: 20,
        price: '0',
        startDate: '2023-12-8 15:00:00',
        endDate: '2023-12-8 17:00:00'
      },
      {
        venueId: 7,
        groupId: 7,
        name: 'Playing Risk!',
        description: 'Risk is a 2-6 player game where stratagy and betrayal go hand in hand! Average play time is 2-4 hours long.',
        type: 'Online',
        capacity: 6,
        price: '0',
        startDate: '2019-9-30 17:00:00',
        endDate: '2019-9-30 21:00:00'
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
