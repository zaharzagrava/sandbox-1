import { DataTypes } from 'sequelize';
import sequelize from '.';
import { TableNames, TagModel } from '../../interfaces';

export const Tag = sequelize.define<TagModel>(
  TableNames.TAGS,
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
  },
  {
    modelName: TableNames.TAGS,
    timestamps: true,
    freezeTableName: true,
    tableName: TableNames.TAGS,
  }
);

// authenticate(password: string) {
//   return bcrypt.compareSync(password, this.password());
// }
