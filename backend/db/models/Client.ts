import { userInfo } from 'os';
import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize: Sequelize) => {
  const Client = sequelize.define(
    'clients',
    {
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },

      website: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      bio: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      avatar: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },

      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },

      gender: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        get() {
          return () => this.getDataValue('password');
        },
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: 'clients',
    }
  );

  Client.beforeCreate(async (model: any) => {
    if (model.changed('password')) {
      model.password = bcrypt.hashSync(
        model.password(),
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
    }
  });

  Client.beforeUpdate(async (model: any) => {
    if (model.changed('password')) {
      model.password = bcrypt.hashSync(
        model.password(),
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );
    }
  });

  Client.prototype.authenticate = function (password: string) {
    return bcrypt.compareSync(password, this.password());
  };

  // Client.associate = (models: any) => {
  //
  //}

  return Client;
};
