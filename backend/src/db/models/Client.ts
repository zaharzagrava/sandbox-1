import { DataTypes } from 'sequelize';
import sequelize from '.';
import { ClientModel } from '../../interfaces';

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
  },
  {
    modelName: 'clients',
    timestamps: true,
    freezeTableName: true,
    tableName: 'clients',
  }
);

// authenticate(password: string) {
//   return bcrypt.compareSync(password, this.password());
// }
