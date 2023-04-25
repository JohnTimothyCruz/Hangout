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
        url: 'https://res.cloudinary.com/highereducation/images/w_2560,h_1440/f_auto,q_auto/g_center,c_fill,f_auto,fl_lossy,q_auto,w_1024,h_336/v1670015316/BestColleges.com/closeup-of-python-code/closeup-of-python-code.jpg?_i=AA',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 2,
        url: 'https://www.thepackablelife.com/wp-content/uploads/2019/07/gifts-for-hikers-2023.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JwoS0hJ2ICiM3V-JArHqOtL3Rsyveu7ZKw&usqp=CAU',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 4,
        url: 'https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 5,
        url: 'https://img.freepik.com/free-vector/flat-people-talking-illustration_52683-70673.jpg?size=626&ext=jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 6,
        url: 'https://www.timeforkids.com/wp-content/uploads/2021/05/210524_CMS_Debate_Hero.jpg?w=1024',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 7,
        url: 'https://image.cnbcfm.com/api/v1/image/104151701-GettyImages-143949731.jpg?v=1481108000&w=929&h=523&ffmt=webp&vtcrop=y',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 1,
        url: 'https://media.sproutsocial.com/uploads/2022/12/sprout-social-playlist.png',
        preview: false,
        description: 'Here\'s the final product! Wow. It is almost indistinguishable from Youtube!'
      },
      {
        groupId: 1,
        url: 'https://globalowls.com/wp-content/uploads/2017/12/GlobalOwls-on-uplifting-news-800x365.png',
        preview: false,
        description: 'Here is our Reddit! We ended up deciding to style it exactly, even though the actual site\'s design is... mid. Anyways, good job all around!'
      },
      {
        groupId: 1,
        url: 'https://blog.hootsuite.com/wp-content/uploads/2022/01/linkedin-for-business-3-620x306.png.webp',
        preview: false,
        description: 'LinkedIn! One of the more difficult sites to replicate fully, but here it is!'
      },
      {
        groupId: 1,
        url: 'https://www.ghacks.net/wp-content/uploads/2022/03/mdn-plus.webp',
        preview: false,
        description: 'MDN! We\'ve all used this before, so making this site was quick. We decided to go one step further and duplicate MDN Plus! The circle thing is pretty neat right?'
      },
      {
        groupId: 1,
        url: 'https://techcrunch.com/wp-content/uploads/2021/03/Desktop-Home-1.png?w=730&crop=1',
        preview: false,
        description: 'The green and black music site! Don\'t ask where we got the music. It was through completely legal means... The Spotify API. What else? :)'
      },
      {
        groupId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/MaustonWisconsinLibraryWIS58WIS82US12WIS16.jpg',
        preview: false,
        description: 'I seem to have over-estimated how much nature was in this park. There were streets and a library a stone throw\'s away. I\'ll find a more scenic route next time. At least everyone had fun!'
      },
      {
        groupId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Gfp-wisconsin-buckhorn-state-park-buckhorn-barrens.jpg/800px-Gfp-wisconsin-buckhorn-state-park-buckhorn-barrens.jpg?20140628235410',
        preview: false,
        description: 'Now THAT is scenic. Buckhorn state park is a beautiful place.'
      },
      {
        groupId: 2,
        url: 'https://live.staticflickr.com/2214/1800915507_b21d718605_b.jpg',
        preview: false,
        description: 'Shout out to Paul for bringing in a tent and some boardgames!'
      },
      {
        groupId: 4,
        url: 'https://p0.pxfuel.com/preview/689/343/770/black-forest-cherry-cake-cake-cherry-pie-cream-cake.jpg',
        preview: false,
        description: 'Can\'t believe an actual professional chef came over on our first event! They really went extra with the presentation, and it was delicious!'
      },
      {
        groupId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Playing-risk.jpg/800px-Playing-risk.jpg?20170518191215',
        preview: false,
        description: 'That was one intense game! Nice hanging out with yall!'
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
      preview: { [Op.in]: [true, false] }
    }, {});
  }
};
