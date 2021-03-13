module.exports = {
  up: async (queryInterface, Sequelize) => {
    /* clients */
    await queryInterface.createTable("clients", {
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
    await queryInterface.createTable("comments", {
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
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      full_text: {
        type: Sequelize.STRING(2200),
        allowNull: true,
      },

      multimedia: {
        type: Sequelize.ARRAY(Sequelize.STRING(255)),
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
    await queryInterface.createTable("hashtags", {
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
    await queryInterface.createTable("tags", {
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

  down: async (queryInterface) => {
    await queryInterface.dropTable("clients");
    await queryInterface.dropTable("comments");
    await queryInterface.dropTable("posts");
    await queryInterface.dropTable("tags");
  },
};
