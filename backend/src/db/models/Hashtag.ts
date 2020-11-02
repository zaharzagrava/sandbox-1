import { DataTypes } from 'sequelize';
import sequelize from '.';
import { HashtagModel, TableNames } from '../../interfaces';

export const Hashtag = sequelize.define<HashtagModel>(
  TableNames.HASHTAGS,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    full_text: {
      type: DataTypes.STRING(255),
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
    modelName: TableNames.HASHTAGS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.HASHTAGS,
  }
);
