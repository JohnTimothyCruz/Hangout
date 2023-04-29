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
        startDate: '2024-3-4 11:00:00',
        endDate: '2024-3-4 12:30:00'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'First Camping Event!',
        description: 'After the successful first event, we decided to have a longer trip! Just for a day, we will be in Buckhorn State Park. Again, we will meet at the venue then make our way to the camp site. Bring food and drinks if you can!',
        type: 'In Person',
        capacity: 25,
        price: '0',
        startDate: '2024-4-24 9:00:00',
        endDate: '2024-4-24 19:00:00'
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
      },
      {
        venueId: 8,
        groupId: 8,
        name: 'Central Park Cleaning',
        description: 'This will be out first event where we will be cleaning up the famous Central Park! High visibility vests and tools will be provided. Please come and clean if you have the time.',
        type: 'In Person',
        capacity: 30,
        price: '0',
        startDate: '2024-1-14 9:00:00',
        endDate: '2024-1-14 11:00:00'
      },
      {
        venueId: 10,
        groupId: 10,
        name: 'How to make an engine that runs on gasoline?',
        description: 'We got Lizzy Smith, an experienced car mechanic, here to show us how to make a functinoal engine. Maybe don\'t follow along at home for this one...',
        type: 'Online',
        capacity: 20,
        price: '1',
        startDate: '2024-3-18 11:23:00',
        endDate: '2024-3-18 13:20:00'
      },
      {
        venueId: 10,
        groupId: 10,
        name: 'How to swim?',
        description: 'We got Michael Hernderson, a certified swimming tutor, to show us how to swim. If you follow along at home, maybe have a supervisor with you.',
        type: 'Online',
        capacity: 20,
        price: '1',
        startDate: '2024-4-18 12:00:00',
        endDate: '2024-4-18 13:01:00'
      },
      {
        venueId: 10,
        groupId: 10,
        name: 'How to survive a nuclear explosion?',
        description: 'We got Amilia Ester, a random person who volunteered to tutor this event, to show us what to do when the clock hits 12.',
        type: 'Online',
        capacity: 20,
        price: '0',
        startDate: '2024-5-18 15:50:00',
        endDate: '2024-5-18 17:20:00'
      },
      {
        venueId: 10,
        groupId: 10,
        name: 'How to create an airplane?',
        description: 'We got Dan Pai, a pilot and part-time model airplane maker, to show us how to make an airplane.',
        type: 'Online',
        capacity: 20,
        price: '0',
        startDate: '2024-6-18 16:40:00',
        endDate: '2024-6-18 18:30:00'
      },
      {
        venueId: 11,
        groupId: 11,
        name: 'Starry Night Photo Show',
        description: 'Take some photos of the night sky and bring them here to show off! Then we\'ll share advice for those who need it!',
        type: 'Online',
        capacity: 20,
        price: '0',
        startDate: '2023-12-30 12:00:00',
        endDate: '2023-12-30 13:40:00'
      },
      {
        venueId: 11,
        groupId: 11,
        name: 'Architecture Photo Show',
        description: 'Take some photos of architecture around you and bring them here to show off! Then we\'ll share advice for those who need it!',
        type: 'Online',
        capacity: 20,
        price: '0',
        startDate: '2024-3-19 10:00:00',
        endDate: '2024-3-19 11:40:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Rocket Launching',
        description: 'We\'re going simple this time and are just going to lauch store bought rockets. But also we\'re going to attach ten rockets together and make them launch one after the other to see how high they fly.',
        type: 'Online',
        capacity: 50,
        price: '5',
        startDate: '2020-1-1 15:00:00',
        endDate: '2020-1-1 17:00:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Sun Laser',
        description: 'We are going to go to an open field, lace it with automated mirrors, and point all of them at random directions, likely setting stuff on fire on the way.',
        type: 'Online',
        capacity: 50,
        price: '5',
        startDate: '2021-12-8 15:00:00',
        endDate: '2021-12-8 17:00:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Boat',
        description: 'We\'re just going to make a boat. Simple wind power ones specifically. Then we\'re going to put them in the middle of the ocean to see if they can break through building-tall waves.',
        type: 'Online',
        capacity: 50,
        price: '5',
        startDate: '2022-12-8 15:00:00',
        endDate: '2022-12-8 17:00:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Baking soda volcano',
        description: 'Exactly what it says on the tin. We\'re doing that same experiment every elementary schooler did. Oh, but we\'re going to make the volcano 20 feet tall. Also there\'s going to be like, 7 of them.',
        type: 'Online',
        capacity: 50,
        price: '5',
        startDate: '2023-1-1 15:00:00',
        endDate: '2023-1-1 17:00:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Tesla Tower',
        description: 'To put in layman\'s terms, we\'re going to make a tower that shoots electricity for kicks. Maybe we\'ll try to charge some car batteries with it.',
        type: 'Online',
        capacity: 50,
        price: '5',
        startDate: '2024-1-1 15:00:00',
        endDate: '2024-1-1 17:00:00'
      },
      {
        venueId: 13,
        groupId: 13,
        name: 'Melancholy',
        description: 'Bring some songs you\'ve enjoyed with the theme \'melancholy\'.',
        type: 'Online',
        capacity: 15,
        price: '0',
        startDate: '2024-6-1 14:30:00',
        endDate: '2024-6-1 16:00:00'
      },
      {
        venueId: 13,
        groupId: 13,
        name: 'City Pop',
        description: 'Bring some songs you\'ve enjoyed with the theme \'city pop\'.',
        type: 'Online',
        capacity: 15,
        price: '0',
        startDate: '2024-12-1 14:30:00',
        endDate: '2024-12-1 16:00:00'
      },
      {
        venueId: 14,
        groupId: 14,
        name: 'Speluncaphobia',
        description: 'On 4/14 at 12am, we\'re going to make an at least 2 hour long video about the subject of speluncaphobia, or fear of caves. 24 hours.',
        type: 'Online',
        capacity: 0,
        price: '0',
        startDate: '2024-4-14 12:00:00',
        endDate: '2024-4-15 12:00:00'
      },
      {
        venueId: 14,
        groupId: 14,
        name: 'Theories on King Arthur',
        description: 'On 7/15 at 12 am, we\'re going to make an at least 15 page paper about the various theories on King Arthur. 24 hours.',
        type: 'Online',
        capacity: 0,
        price: '0',
        startDate: '2024-7-15 12:00:00',
        endDate: '2024-7-16 12:00:00'
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
      groupId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
