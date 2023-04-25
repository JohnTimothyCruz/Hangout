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
