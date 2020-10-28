import { DataTypes } from 'sequelize';
import sequelize from '.';
import { ClientModel } from '../../interfaces';
import bcrypt from 'bcrypt';

export const Client = sequelize.define<ClientModel>(
  'clients',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },

    gender: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get() {
        return () => this.getDataValue('password');
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    modelName: 'clients',
    timestamps: true,
    freezeTableName: true,
    tableName: 'clients',
    hooks: {
      beforeCreate: async (model: any) => {
        if (model.changed('password')) {
          model.password = bcrypt.hashSync(
            model.password(),
            Number(process.env.BCRYPT_SALT_ROUNDS)
          );
        }
      },
      beforeUpdate: async (model: any) => {
        if (model.changed('password')) {
          model.password = bcrypt.hashSync(
            model.password(),
            Number(process.env.BCRYPT_SALT_ROUNDS)
          );
        }
      },
    },
  }
);

Client.prototype.authenticate = function authenticate(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(password, hashedPassword);
};
