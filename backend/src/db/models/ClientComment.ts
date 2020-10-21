import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { TableNames } from '../../interfaces';
import { Client } from './Client';
import { Comment } from './Comment';

export const ClientComment = sequelize.define(
  TableNames.CLIENTS_COMMENTS,
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

    comment_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.COMMENTS,
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
    modelName: TableNames.CLIENTS_COMMENTS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.CLIENTS_COMMENTS,
  }
);

Client.belongsToMany(Comment, {
  through: ClientComment,
  foreignKey: 'client_id',
});
Comment.belongsToMany(Client, {
  through: ClientComment,
  foreignKey: 'task_id',
});