import { DataTypes } from 'sequelize';
import sequelize from '.';
import { ClientPostModel, TableNames } from '../../interfaces';
import { Post } from './Post';
import { Client } from './Client';

export const ClientPost = sequelize.define<ClientPostModel>(
  TableNames.CLIENTS_POSTS,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    client_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.CLIENTS,
        key: 'id',
      },
      allowNull: false,
    },

    post_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.POSTS,
        key: 'id',
      },
      allowNull: false,
    },

    is_liked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    is_author: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: TableNames.CLIENTS_POSTS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.CLIENTS_POSTS,
  }
);

Client.belongsToMany(Post, {
  through: ClientPost,
  foreignKey: 'client_id',
});
Post.belongsToMany(Client, {
  through: ClientPost,
  foreignKey: 'post_id',
});
