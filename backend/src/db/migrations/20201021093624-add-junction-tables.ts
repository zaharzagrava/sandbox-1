'use strict';

import Sequelize, { QueryInterface } from 'sequelize';
import { TableNames } from '../../interfaces/';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    /* hashtags_textsources */
    /* table that tells where a hashtag is used in entire Instagram */
    /* using it we can easily implement hashtag-based queries */
    await queryInterface.createTable(TableNames.HASHTAGS_TEXTSOURCES, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      hashtag_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.HASHTAGS,
          key: 'id',
        },
        allowNull: false,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.CLIENTS,
          key: 'id',
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
          model: TableNames.POSTS,
          key: 'id',
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
          model: TableNames.COMMENTS,
          key: 'id',
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
    await queryInterface.createTable(TableNames.TAGS_TEXTSOURCES, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      tag_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.TAGS,
          key: 'id',
        },
        allowNull: false,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.CLIENTS,
          key: 'id',
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
          model: TableNames.POSTS,
          key: 'id',
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
          model: TableNames.COMMENTS,
          key: 'id',
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
    await queryInterface.createTable(TableNames.CLIENTS_POSTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.CLIENTS,
          key: 'id',
        },
        allowNull: false,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.POSTS,
          key: 'id',
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
    await queryInterface.createTable(TableNames.CLIENTS_COMMENTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      client_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.CLIENTS,
          key: 'id',
        },
        allowNull: false,
      },

      comment_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.COMMENTS,
          key: 'id',
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

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(TableNames.HASHTAGS_TEXTSOURCES);
    await queryInterface.dropTable(TableNames.TAGS_TEXTSOURCES);
    await queryInterface.dropTable(TableNames.CLIENTS_POSTS);
    await queryInterface.dropTable(TableNames.CLIENTS_COMMENTS);
  },
};
