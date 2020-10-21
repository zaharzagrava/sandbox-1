import { DataTypes } from 'sequelize';
import sequelize from '.';
import { TableNames } from '../../interfaces';
import { Client } from './Client';
import { Tag } from './Tag';
import { Post } from './Post';
import { Comment } from './Comment';

export const TagTextsource = sequelize.define(
  TableNames.TAGS_TEXTSOURCES,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    tag_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.TAGS,
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
    modelName: TableNames.TAGS_TEXTSOURCES,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.TAGS_TEXTSOURCES,
  }
);

Tag.belongsToMany(Client, {
  through: TagTextsource,
  foreignKey: 'client_id',
});
Tag.belongsToMany(Post, {
  through: TagTextsource,
  foreignKey: 'post_id',
});
Tag.belongsToMany(Comment, {
  through: TagTextsource,
  foreignKey: 'comment_id',
});
