import Sequelize, { QueryInterface } from 'sequelize';
import { TableNames } from '../../interfaces/';

export default {
  up: async (queryInterface: QueryInterface) => {
    /* clients */
    await queryInterface.createTable(TableNames.CLIENTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },

      website: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      bio: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      phone_number: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
      },

      gender: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      password: {
        type: Sequelize.STRING(255),
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

    /* comments */
    await queryInterface.createTable(TableNames.COMMENTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_text: {
        type: Sequelize.STRING(300),
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

    /* posts */
    await queryInterface.createTable(TableNames.POSTS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_text: {
        type: Sequelize.STRING(2200),
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

    /* hashtags */
    await queryInterface.createTable(TableNames.HASHTAGS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_text: {
        type: Sequelize.STRING(255),
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

    /* tags */
    await queryInterface.createTable(TableNames.TAGS, {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_text: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable(TableNames.CLIENTS);
    await queryInterface.dropTable(TableNames.COMMENTS);
    await queryInterface.dropTable(TableNames.POSTS);
    await queryInterface.dropTable(TableNames.TAGS);
  },
};
