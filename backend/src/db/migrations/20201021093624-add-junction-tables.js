"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* hashtags_textsources */
    /* table that tells where a hashtag is used in entire Instagram */
    /* using it we can easily implement hashtag-based queries */
    await queryInterface.createTable("hashtags_textsources", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      hashtag_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "hashtags",
          key: "id",
        },
        allowNull: false,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "clients",
          key: "id",
        },
        allowNull: true,
      },

      client_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: true,
      },

      post_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      comment_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "comments",
          key: "id",
        },
        allowNull: true,
      },

      comment_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

    /* tags_textsources */
    /* table that tells where a tag is used in entire Instagram */
    /* using it we can easily implement tag-based queries */
    await queryInterface.createTable("tags_textsources", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      tag_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "tags",
          key: "id",
        },
        allowNull: false,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "clients",
          key: "id",
        },
        allowNull: true,
      },

      client_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: true,
      },

      post_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      comment_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "comments",
          key: "id",
        },
        allowNull: true,
      },

      comment_field: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

    /* clients_posts */
    await queryInterface.createTable("clients_posts", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "clients",
          key: "id",
        },
        allowNull: false,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "posts",
          key: "id",
        },
        allowNull: false,
      },

      is_liked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      is_author: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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

    /* clients_comments */
    await queryInterface.createTable("clients_comments", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "clients",
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

      is_liked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      is_author: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable("hashtags_textsources");
    await queryInterface.dropTable("tags_textsources");
    await queryInterface.dropTable("clients_posts");
    await queryInterface.dropTable("clients_comments");
  },
};
