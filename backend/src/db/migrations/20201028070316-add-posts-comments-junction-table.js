"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* clients_comments */
    await queryInterface.createTable("posts_comments", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: false,
      },

      comment_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "comments",
          key: "id",
        },
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("posts_comments");
  },
};
