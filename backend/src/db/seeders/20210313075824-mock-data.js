"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("clients_comments", null, {});
    await queryInterface.bulkDelete("clients_posts", null, {});
    await queryInterface.bulkDelete("hashtags_textsources", null, {});
    await queryInterface.bulkDelete("posts_comments", null, {});
    await queryInterface.bulkDelete("tags_textsources", null, {});

    await queryInterface.bulkDelete("clients", null, {});
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("hashtags", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("tags", null, {});
  },
};
