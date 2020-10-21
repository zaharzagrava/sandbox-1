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

// authenticate(password: string) {
//   return bcrypt.compareSync(password, this.password());
// }
