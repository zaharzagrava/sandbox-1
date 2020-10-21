import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { TableNames } from '../../interfaces';
import { Post } from './Post';
import { Client } from './Client';

export const ClientPost = sequelize.define(
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
