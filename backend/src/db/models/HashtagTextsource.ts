import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { TableNames } from '../../interfaces';
import { Hashtag } from './Hashtag';
import { Client } from './Client';
import { Post } from './Post';
import { Comment } from './Comment';

export const HashtagTextsource = sequelize.define(
  TableNames.HASHTAGS_TEXTSOURCES,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    hashtag_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.HASHTAGS,
        key: 'id',
      },
      allowNull: false,
    },

    client_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.CLIENTS,
        key: 'id',
      },
      allowNull: true,
    },

    client_field: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    post_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.POSTS,
        key: 'id',
      },
      allowNull: true,
    },

    post_field: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    comment_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.COMMENTS,
        key: 'id',
      },
      allowNull: true,
    },

    comment_field: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    modelName: TableNames.HASHTAGS_TEXTSOURCES,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.HASHTAGS_TEXTSOURCES,
  }
);

Hashtag.belongsToMany(Client, {
  through: HashtagTextsource,
  foreignKey: 'client_id',
});
Hashtag.belongsToMany(Post, {
  through: HashtagTextsource,
  foreignKey: 'post_id',
});
Hashtag.belongsToMany(Comment, {
  through: HashtagTextsource,
  foreignKey: 'comment_id',
});
