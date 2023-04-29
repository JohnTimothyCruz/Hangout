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
        url: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/youtube_logo_icon_168737.png',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://cdn.icon-icons.com/icons2/729/PNG/512/reddit_icon-icons.com_62749.png',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://cdn.icon-icons.com/icons2/1099/PNG/512/1485482199-linkedin_78667.png',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://cdn.icon-icons.com/icons2/2389/PNG/512/mozilla_logo_icon_145048.png',
        preview: true
      }, {
        eventId: 5,
        url: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/spotify_icon_130826.png',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://cdn.icon-icons.com/icons2/2429/PNG/512/kickstarter_logo_icon_147271.png',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg/300px-Hiking_to_the_Ice_Lakes._San_Juan_National_Forest%2C_Colorado.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://www.nps.gov/grte/planyourvisit/images/JLCG_tents_Teewinot_2008_mattson_1.JPG?maxwidth=1300&maxheight=1300&autorotate=false',
        preview: true
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
        url: 'https://media.istockphoto.com/id/1139543834/vector/two-business-people-office-workers-man-woman-characters-talking-business-life-concept-vector.jpg?s=612x612&w=0&k=20&c=pvwFUkZZoC3Sbv0A534LHWMe6mW7Uj_ZWkYVnnP0vjY=',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://media.istockphoto.com/id/1139543834/vector/two-business-people-office-workers-man-woman-characters-talking-business-life-concept-vector.jpg?s=612x612&w=0&k=20&c=pvwFUkZZoC3Sbv0A534LHWMe6mW7Uj_ZWkYVnnP0vjY=',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://media.istockphoto.com/id/1139543834/vector/two-business-people-office-workers-man-woman-characters-talking-business-life-concept-vector.jpg?s=612x612&w=0&k=20&c=pvwFUkZZoC3Sbv0A534LHWMe6mW7Uj_ZWkYVnnP0vjY=',
        preview: true
      }, {
        eventId: 14,
        url: 'https://media.istockphoto.com/id/1139543834/vector/two-business-people-office-workers-man-woman-characters-talking-business-life-concept-vector.jpg?s=612x612&w=0&k=20&c=pvwFUkZZoC3Sbv0A534LHWMe6mW7Uj_ZWkYVnnP0vjY=',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://media.istockphoto.com/id/1285965933/photo/audiobooks-concept.jpg?s=612x612&w=0&k=20&c=qg6eBtrhwa1eRe-bEFXHs9eMtfTCMSn0ienNMw3XO04=',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWMwFgcYFDCq46r9UIxm1sfq3a1P3ifVbxQ&usqp=CAU',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://www.newyorkbyrail.com/wp-content/uploads/2017/12/Central-Park-New-York-City-New-York-By-Rail.jpg',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg/220px-Porsche_3512_engine_rear-left_2019_Prototyp_Museum.jpg',
        preview: true
      },
      {
        eventId: 19,
        url: 'https://www.unh.edu/unhtoday/sites/default/files/styles/article_huge/public/article/2022/ocean_desert.jpeg?itok=Yl-z8ctk',
        preview: true
      },
      {
        eventId: 20,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Operation_Upshot-Knothole_-_Badger_001.jpg/250px-Operation_Upshot-Knothole_-_Badger_001.jpg',
        preview: true
      },
      {
        eventId: 21,
        url: 'https://cfd2012.com/uploads/3/5/1/0/35107563/2498516.jpg?635',
        preview: true
      },
      {
        eventId: 22,
        url: 'https://s7d2.scene7.com/is/image/TWCNews/stars_png?wid=1024&hei=576&$wide-bg$',
        preview: true
      },
      {
        eventId: 23,
        url: 'https://static.dezeen.com/uploads/2022/07/pemberton-heights-sanders-architecture-hero-852x479.jpg',
        preview: true
      },
      {
        eventId: 24,
        url: 'https://www.wired.com/wp-content/uploads/images_blogs/geekdad/images/2009/04/19/saturnv_2.jpg',
        preview: true
      },
      {
        eventId: 25,
        url: 'https://universemagazine.com/wp-content/uploads/2022/06/0-1-1024x683.jpg',
        preview: true
      },
      {
        eventId: 26,
        url: 'https://media.istockphoto.com/id/1340079356/photo/illustration-of-the-ship-in-the-storm-gigantic-waves.jpg?s=612x612&w=0&k=20&c=lZC0_-xmS_mC2L0BgWPLyaYDtWnkT8VsNyln6QVIia0=',
        preview: true
      },
      {
        eventId: 27,
        url: 'https://medlineplus.gov/images/Volcanoes.jpg',
        preview: true
      },
      {
        eventId: 28,
        url: 'https://www.eastbaytimes.com/wp-content/uploads/2020/02/ALJ-L-TESLA-0207-4_72327492.jpg?w=620',
        preview: true
      },
      {
        eventId: 29,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Edvard_Munch_-_Melancholy_%281894%29.jpg/220px-Edvard_Munch_-_Melancholy_%281894%29.jpg',
        preview: true
      },
      {
        eventId: 30,
        url: 'https://www.rollingstone.com/wp-content/uploads/2019/05/tokyo-at-night.jpg?w=1581&h=1054&crop=1',
        preview: true
      },
      {
        eventId: 31,
        url: 'https://media.timeout.com/images/105875364/750/422/image.jpg',
        preview: true
      },
      {
        eventId: 32,
        url: 'https://www.sbs.com.au/guide/sites/sbs.com.au.guide/files/styles/full/public/charles_ernest_butler_-_king_arthur.jpg?itok=LSM9iAcJ&mtime=1547434923',
        preview: true
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
