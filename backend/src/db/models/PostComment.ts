import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import { PostCommentModel, TableNames } from '../../interfaces';
import { Post } from './Post';
import { Comment } from './Comment';

export const PostComment = sequelize.define<PostCommentModel>(
  TableNames.POSTS_COMMENTS,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    post_id: {
      type: DataTypes.BIGINT,
      references: {
        model: TableNames.POSTS,
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
    modelName: TableNames.POSTS_COMMENTS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.POSTS_COMMENTS,
  }
);

Post.belongsToMany(Comment, {
  through: PostComment,
  foreignKey: 'post_id',
});
Comment.belongsToMany(Post, {
  through: PostComment,
  foreignKey: 'comment_id',
});
