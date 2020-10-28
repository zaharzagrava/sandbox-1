import { DataTypes } from 'sequelize';
import sequelize from '.';
import { CommentModel, TableNames } from '../../interfaces';

export const Comment = sequelize.define<CommentModel>(
  TableNames.COMMENTS,
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    full_text: {
      type: DataTypes.STRING(300),
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
    modelName: TableNames.COMMENTS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.COMMENTS,
  }
);

// authenticate(password: string) {
//   return bcrypt.compareSync(password, this.password());
// }
