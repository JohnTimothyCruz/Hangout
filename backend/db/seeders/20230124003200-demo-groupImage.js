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
        url: 'https://help.kickstarter.com/hc/article_attachments/360045212034/English__1_.png',
        preview: false,
        description: 'Kickstarter! The site changed layout during production but hey, it is what it is. And it turned out nice!'
      },
      {
        groupId: 2,
        url: 'https://www.thepackablelife.com/wp-content/uploads/2019/07/gifts-for-hikers-2023.jpg',
        preview: true,
        description: 'group-cover'
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
        groupId: 4,
        url: 'https://p0.pxfuel.com/preview/689/343/770/black-forest-cherry-cake-cake-cherry-pie-cream-cake.jpg',
        preview: false,
        description: 'Can\'t believe an actual professional chef came over on our first event! They really went extra with the presentation, and it was delicious!'
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
        groupId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Playing-risk.jpg/800px-Playing-risk.jpg?20170518191215',
        preview: false,
        description: 'That was one intense game! Nice hanging out with yall!'
      },
      {
        groupId: 8,
        url: 'https://static.vecteezy.com/system/resources/previews/002/182/939/non_2x/people-picking-up-trash-at-the-park-vector.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 9,
        url: 'https://downtown-brooklyn.imgix.net/imgr/Alamo-Drafthouse-Cinema-2x.jpg?fm=jpg&auto=compress,enhance,format&w=1200',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 10,
        url: 'https://cdn.elearningindustry.com/wp-content/uploads/2019/10/7-Benefits-That-Highlight-The-Importance-Of-Soft-Skills-In-The-Workplace.png',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 11,
        url: 'https://www.visitmysmokies.com/wp-content/uploads/2015/08/person-taking-pictures-of-the-Smoky-Mountains.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 12,
        url: 'https://19948058.fs1.hubspotusercontent-na1.net/hubfs/19948058/architect-construction-plans%20%281%29.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 12,
        url: 'https://ychef.files.bbci.co.uk/1280x720/p0cllxf2.webp',
        preview: false,
        description: 'So we launched a bunch of model rockets one after the other, but that was boring. So afterwards we just decided to build and launch an actual rocket.'
      },
      {
        groupId: 12,
        url: 'https://foxillinois.com/resources/media/eb0a4fba-e977-4921-a853-fe6bec1f8044-medium16x9_4.jpeg?1616978263641',
        preview: false,
        description: 'We may have set a tree on fire... Allegedly.'
      },
      {
        groupId: 12,
        url: 'https://s.yimg.com/ny/api/res/1.2/rBzTStajeE2ghheZVjGliQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTcwNTtoPTQxNztjZj13ZWJw/https://media.zenfs.com/en/accuweather_297/0983006f9c8c30a6bef7779e108e8865',
        preview: false,
        description: 'Wow. That ship stood no chance against those waves.'
      },
      {
        groupId: 13,
        url: 'https://img.oercommons.org/300x168/oercommons/media/courseware/lesson/image/music-colour-splash.jpg',
        preview: true,
        description: 'group-cover'
      },
      {
        groupId: 14,
        url: 'https://media.istockphoto.com/id/1244574630/photo/alarm-clock-on-fire-with-actual-flame.jpg?s=612x612&w=0&k=20&c=J0HcggVJ6ewE5XxzdOLhPMDFiBhCn2r2Bu2RpWELNhE=',
        preview: true,
        description: 'group-cover'
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
