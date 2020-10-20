import Sequelize, { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },

      website: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      bio: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      avatar: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      phone_number: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },

      gender: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('clients');
  },
};
