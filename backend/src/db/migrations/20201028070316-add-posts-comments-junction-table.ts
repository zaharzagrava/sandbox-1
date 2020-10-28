'use strict';

import Sequelize, { QueryInterface } from 'sequelize';
import { TableNames } from '../../interfaces/';

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    /* clients_comments */
    await queryInterface.createTable(TableNames.POSTS_COMMENTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      post_id: {
        type: Sequelize.BIGINT,
        references: {
          model: TableNames.POSTS,
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
    await queryInterface.dropTable(TableNames.POSTS_COMMENTS);

  }
};
