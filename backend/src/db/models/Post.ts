import { DataTypes } from 'sequelize';
import sequelize from '.';
import { PostModel, TableNames } from '../../interfaces';

export const Post = sequelize.define<PostModel>(
  TableNames.POSTS,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    full_text: {
      type: DataTypes.STRING(2200),
      allowNull: true,
    },

    multimedia: {
      type: DataTypes.ARRAY(DataTypes.STRING(255)),
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
    modelName: TableNames.POSTS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.POSTS,
  }
);
